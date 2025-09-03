import SearchControls from '@/components/SearchControls';
import ClientProductCarousel from '@/components/ClientProductCarousel';
import { ModelResult, Product, ModelId } from '@/types';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const getModelName = (modelId: string): string => {
  const modelNames: Record<string, string> = {
    'L_prod': 'You May Like',
    'B_prod': 'Similar Items', 
    'F_prod': 'Frequently Bought Together',
    'T_prod': 'Top Sellers'
  };
  return modelNames[modelId] || modelId;
};

async function fetchModelData(models: string[], itemId: string): Promise<ModelResult[]> {
  // Make parallel API calls for each model
  const apiCalls = models.map(async (model) => {
    const apiUrl = `https://repersonalize.jewelml.io/c/p/67fd95260740ccc4ec658d03/l?model=${encodeURIComponent(model)}&item_id=${encodeURIComponent(itemId)}&minimum_items=2&number_of_placements=20`;
    
    try {
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      return {
        model,
        data,
        error: null
      };
    } catch (error) {
      return {
        model,
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  });
  
  return await Promise.all(apiCalls);
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  const itemId = typeof params.item_id === 'string' ? params.item_id : '1177646331_multicolor';
  const modelParam = typeof params.model === 'string' ? params.model : 'B_prod';
  const models = modelParam.split(',').map(m => m.trim());
  
  let modelResults: ModelResult[] = [];
  let error: string | null = null;

  // Only fetch data if item_id is provided in query
  if (params.item_id) {
    try {
      modelResults = await fetchModelData(models, itemId);
    } catch (err) {
      error = err instanceof Error ? err.message : 'Failed to fetch data';
    }
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '1400px', margin: '0 auto' }}>
      <main>
        <h1>Jewel ML - Basic usage example</h1>
        
        <SearchControls />
        
        {error ? (
          <div style={{ color: 'red', padding: '15px', border: '1px solid red', borderRadius: '4px', marginBottom: '20px' }}>
            <h3>Error fetching data:</h3>
            <p>{error}</p>
          </div>
        ) : modelResults && modelResults.length > 0 ? (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <h2>Recommendations</h2>
              <p style={{ color: '#666', fontSize: '14px' }}>
                {itemId && <span>Item ID: <strong>{itemId}</strong></span>}
                {models && <span> • Models: <strong>{models.join(', ')}</strong></span>}
              </p>
            </div>
            
            {modelResults.map((result, index) => (
              <div key={result.model} style={{ marginBottom: '40px' }}>
                {result.error ? (
                  <div style={{ color: 'red', padding: '15px', border: '1px solid red', borderRadius: '4px', marginBottom: '20px' }}>
                    <h3>Error for {result.model} ({getModelName(result.model)}):</h3>
                    <p>{result.error}</p>
                  </div>
                ) : result.data && Array.isArray(result.data) && result.data.length > 0 ? (
                  <div>
                    <h3 style={{ marginBottom: '15px' }}>
                      {result.model} - {getModelName(result.model)}
                      <span style={{ color: '#666', fontSize: '14px', fontWeight: 'normal', marginLeft: '10px' }}>
                        ({result.data.length} productos)
                      </span>
                    </h3>
                    <ClientProductCarousel products={result.data} />
                    
                    <div style={{ marginTop: '20px' }}>
                      <details>
                        <summary style={{ cursor: 'pointer', padding: '10px', background: '#f5f5f5', borderRadius: '4px' }}>
                          View Raw API Response - {result.model}
                        </summary>
                        <pre style={{ 
                          background: '#f5f5f5', 
                          padding: '15px', 
                          borderRadius: '4px', 
                          overflow: 'auto',
                          maxHeight: '400px',
                          fontSize: '12px',
                          marginTop: '10px'
                        }}>
                          {JSON.stringify(result.data, null, 2)}
                        </pre>
                      </details>
                    </div>
                  </div>
                ) : (
                  <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '4px', marginBottom: '20px' }}>
                    <h3>{result.model} - {getModelName(result.model)}</h3>
                    <p style={{ color: '#666' }}>No products found for this model</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px 20px',
            color: '#666'
          }}>
            <h3>No products found</h3>
            <p>Enter an item ID above to get recommendations</p>
          </div>
        )}
      </main>
    </div>
  );
}