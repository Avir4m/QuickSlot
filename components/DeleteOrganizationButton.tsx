'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface DeleteButtonProps {
  organizationName: string;
  organizationId: string;
}

export default function DeleteOrganizationButton({ organizationName, organizationId }: DeleteButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${organizationName}"?`)) return;

    setLoading(true);

    try {
      const res = await fetch(`/api/organizations/${organizationId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Organization deleted successfully.");
        window.location.href = "/organizations";
      } else {
        const data = await res.json();
        alert(`Failed to delete organization: ${data.message}`);
      }
    } catch (error) {
      console.error("Failed to delete organization:", error);
      alert("An error occurred while deleting the organization.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
    onClick={handleDelete}
    className="bg-red-500 hover:bg-red-700 mt-4"
    disabled={loading}
    >
      {loading ? "Deleting..." : `Delete ${organizationName}`}
    </Button>
  );
}