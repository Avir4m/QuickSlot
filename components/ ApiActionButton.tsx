'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface ApiActionButtonProps {
  label: string;
  apiUrl: string;
  method: 'DELETE' | 'POST' | 'PUT' | 'GET';
  body?: Record<string, any>;
  className?: string;
}

export default function ApiActionButton({
  label,
  apiUrl,
  method,
  body,
  className,
}: ApiActionButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleAction = async () => {
    if (!confirm(`Are you sure you want to proceed with this action?`)) return;

    setLoading(true);

    try {
      const options: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined,
      };

      const res = await fetch(apiUrl, options);

      if (res.ok) {
      } else {
        const data = await res.json();
        const errorMessage = data.message || 'An unknown error occurred.';
          alert(`Failed to complete action: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Action failed:', error);
      alert('An error occurred while performing the action.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleAction}
      disabled={loading}
      className={className}
    >
      {loading ? 'Processing...' : label}
    </Button>
  );
}
