"use client";

import { deleteOrganization, getOrganization } from "@/app/actions/organizations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function OrganizationSettingsPage({ params }: { params: Promise<{ uuid: string }> }) {
    const [loading, setLoading] = useState(false);
    const [organizationName, setOrganizationName] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        const fetchOrganization = async () => {
            try {
                const { uuid } = await params;
                const organization = await getOrganization(uuid);
                setOrganizationName(organization.name);
            } catch (error) {
                console.error("Error fetching organization:", error);
                alert("Failed to load organization details.");
            }
        };

        fetchOrganization();
    }, [params]);

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this organization?")) return;

        setLoading(true);

        try {
            const { uuid } = await params;
            const result = await deleteOrganization(uuid);

            if (result.success) {
                alert("Organization deleted successfully.");
                router.push("/organizations");
            } else {
                alert(`Failed to delete organization: ${result.message}`);
            }
        } catch (error) {
            console.error("Error deleting organization:", error);
            alert("An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="flex flex-col gap-4">
                <h1 className="text-lg font-bold">Organization Settings</h1>

                <div className="flex gap-4">
                    <Input value={organizationName} readOnly />
                    <Button>Update</Button>
                </div>

                <Button
                    onClick={handleDelete}
                    disabled={loading}
                    className={`bg-red-500 hover:bg-red-600 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                    {loading ? "Deleting..." : "Delete Organization"}
                </Button>
            </div>
        </>
    );
}