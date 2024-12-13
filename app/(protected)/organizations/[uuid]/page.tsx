import { notFound } from 'next/navigation';
import { getOrganization, isOwnerOfOrg } from '@/app/actions/organizations';
import DeleteOrganizationButton from '@/components/DeleteOrganizationButton';

export default async function OrganizationPage({ params }: { params: { uuid: string } }) {
  const { uuid } = params;

  let organization = null;
  let isOwner = false;

  try {
    organization = await getOrganization(uuid);
    isOwner = await isOwnerOfOrg(uuid);
  } catch (error) {
    console.error("Error loading organization:", error);
  }

  if (!organization) {
    notFound();
  }

  return (
    <div className="items-center">
      <h1>{organization.name}</h1>
      {isOwner && (
        <DeleteOrganizationButton
          organizationName={organization.name}
          organizationId={uuid}
        />
      )}
    </div>
  );
}
