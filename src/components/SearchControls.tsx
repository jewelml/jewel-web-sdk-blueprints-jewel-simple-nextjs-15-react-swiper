'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SearchControlsProps, ModelId, ModelOption } from '@/types';

export default function SearchControls({}: SearchControlsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [itemId, setItemId] = useState<string>('');
  const [selectedModels, setSelectedModels] = useState<ModelId[]>(['B_prod']);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize from URL params
    const itemIdParam = searchParams.get('item_id');
    const modelParam = searchParams.get('model');
    
    if (itemIdParam) {
      setItemId(itemIdParam);
    }
    if (modelParam) {
      const models = modelParam.split(',').map(m => m.trim()) as ModelId[];
      setSelectedModels(models);
    }
  }, [searchParams]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (!itemId.trim()) {
      alert('Please enter an item ID');
      return;
    }

    if (selectedModels.length === 0) {
      alert('Please select at least one model');
      return;
    }

    const params = new URLSearchParams();
    params.set('item_id', itemId.trim());
    params.set('model', selectedModels.join(','));
    
    router.push(`/?${params.toString()}`);
  };

  const handleModelToggle = (modelValue: ModelId) => {
    setSelectedModels(prev => {
      if (prev.includes(modelValue)) {
        return prev.filter(m => m !== modelValue);
      } else {
        return [...prev, modelValue];
      }
    });
  };

  const availableModels: ModelOption[] = [
    { value: 'L_prod', label: 'L_prod (You May Like)' },
    { value: 'B_prod', label: 'B_prod (Similar Items)' },
    { value: 'F_prod', label: 'F_prod (Frequently Bought Together)' },
    { value: 'T_prod', label: 'T_prod (Top Sellers)' }
  ];

  const getSelectedLabels = (): string => {
    if (selectedModels.length === 0) return 'Select models';
    if (selectedModels.length === 1) {
      const model = availableModels.find(m => m.value === selectedModels[0]);
      return model ? model.label : selectedModels[0];
    }
    return `${selectedModels.length} models selected`;
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div style={{
      backgroundColor: '#f8f9fa',
      padding: '20px',
      borderRadius: '8px',
      marginBottom: '30px',
      display: 'flex',
      gap: '15px',
      alignItems: 'end',
      flexWrap: 'wrap'
    }}>
      <div style={{ flex: '1', minWidth: '200px' }}>
        <label style={{
          display: 'block',
          marginBottom: '5px',
          fontSize: '14px',
          fontWeight: '500',
          color: '#333'
        }}>
          Item ID
        </label>
        <input
          type="text"
          value={itemId}
          onChange={(e) => setItemId(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="e.g. 1177646331_multicolor"
          style={{
            width: '100%',
            padding: '10px 12px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '14px',
            boxSizing: 'border-box'
          }}
        />
      </div>

      <div style={{ minWidth: '200px', position: 'relative' }} ref={dropdownRef}>
        <label style={{
          display: 'block',
          marginBottom: '5px',
          fontSize: '14px',
          fontWeight: '500',
          color: '#333'
        }}>
          Models
        </label>
        <div
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          style={{
            width: '100%',
            padding: '10px 12px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '14px',
            backgroundColor: 'white',
            boxSizing: 'border-box',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <span style={{ 
            color: selectedModels.length === 0 ? '#999' : '#333',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>
            {getSelectedLabels()}
          </span>
          <span style={{ marginLeft: '8px', fontSize: '12px' }}>
            {isDropdownOpen ? '▲' : '▼'}
          </span>
        </div>
        
        {isDropdownOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: '0',
            right: '0',
            backgroundColor: 'white',
            border: '1px solid #ddd',
            borderTop: 'none',
            borderRadius: '0 0 4px 4px',
            zIndex: 1000,
            maxHeight: '200px',
            overflowY: 'auto'
          }}>
            {availableModels.map(model => (
              <div
                key={model.value}
                onClick={() => handleModelToggle(model.value)}
                style={{
                  padding: '10px 12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '14px',
                  backgroundColor: selectedModels.includes(model.value) ? '#f0f8ff' : 'white',
                  borderBottom: '1px solid #eee'
                }}
                onMouseEnter={(e) => {
                  if (!selectedModels.includes(model.value)) {
                    (e.target as HTMLElement).style.backgroundColor = '#f5f5f5';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!selectedModels.includes(model.value)) {
                    (e.target as HTMLElement).style.backgroundColor = 'white';
                  }
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedModels.includes(model.value)}
                  onChange={() => {}} // Handled by parent onClick
                  style={{ marginRight: '8px', pointerEvents: 'none' }}
                />
                {model.label}
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={handleSearch}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontSize: '14px',
          fontWeight: '500',
          cursor: 'pointer',
          minWidth: '100px'
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}
      >
        Load Recommendations
      </button>
    </div>
  );
}