// Form data structure - what the user fills out
export type RegistrationFormData = {
  first_name: string;
  last_name: string;
  applicant_date_of_birth: string; // from input (e.g. "1990-01-01")
  gender: string;
  email: string;
  phone: string;
  applicant_alternate_phone_number?: string;
  business_name?: string;
  registration_number?: string;
  type_of_business?: string;
  industry?: string;
  business_address?: string;
  employees?: string;
  membership_category: string;
  motivation: string;
  docs_id: boolean;
  docs_registration: boolean;
  docs_residence: boolean;
  docs_profile: boolean;
  documents: FileList; // files to upload to Storage first
  signature: string; // likely a data URL or text; backend expects varchar
  signature_date: string; // e.g. "2024-01-31"
};

// What the DB insert expects (JSON payload you send via Supabase)
// Matches schema: public.registrations table
// Constraints:
// - email_address: UNIQUE
// - gender: IN ('Male', 'Female', 'Other')
// - membership_category: IN ('Individual Member', 'Small Business Member', 'Corporate Member', 'Youth/Student Member', 'Non-Profit Organization')
// - application_status: IN ('Pending', 'Under Review', 'Approved', 'Rejected') - defaults to 'Pending'
export type RegistrationInsert = {
  first_name: string;
  last_name: string;
  date_of_birth: string; // send as "YYYY-MM-DD" (Postgres date)
  gender: string; // 'Male' | 'Female' | 'Other'
  email_address: string; // unique constraint
  phone_number: string;
  alternative_phone_number?: string | null;
  business_name?: string | null;
  registration_number?: string | null;
  business_type?: string | null;
  industry_sector?: string | null;
  business_address?: string | null;
  number_of_employees?: number | null;
  membership_category: string; // 'Individual Member' | 'Small Business Member' | 'Corporate Member' | 'Youth/Student Member' | 'Non-Profit Organization'
  motivation_for_joining: string;
  copy_of_id_or_passport?: boolean | null; // defaults to false
  business_registration_documents?: boolean | null; // defaults to false
  proof_of_residence?: boolean | null; // defaults to false
  company_profile?: boolean | null; // defaults to false
  uploaded_documents?: string[] | null; // array of document URLs/paths
  declaration_accepted?: boolean | null; // defaults to true
  applicant_signature: string;
  signature_date: string; // send as "YYYY-MM-DD" (Postgres date)
  application_status?: string; // defaults to 'Pending'; 'Pending' | 'Under Review' | 'Approved' | 'Rejected'
  // created_at and updated_at are handled server-side automatically
};

// Convert form data -> DB payload (uploaded_documents needs separate upload step)
export function toRegistrationInsert(
  form: RegistrationFormData,
  uploadedDocuments: string[]
): RegistrationInsert {
  const numberOfEmployees =
    form.employees && form.employees.trim() !== ""
      ? Number(form.employees)
      : null;

  return {
    first_name: form.first_name,
    last_name: form.last_name,
    date_of_birth: form.applicant_date_of_birth,
    gender: form.gender,
    email_address: form.email,
    phone_number: form.phone,
    alternative_phone_number: form.applicant_alternate_phone_number ?? undefined,
    business_name: form.business_name,
    registration_number: form.registration_number,
    business_type: form.type_of_business,
    industry_sector: form.industry,
    business_address: form.business_address,
    number_of_employees: numberOfEmployees,
    membership_category: form.membership_category,
    motivation_for_joining: form.motivation,
    copy_of_id_or_passport: form.docs_id,
    business_registration_documents: form.docs_registration,
    proof_of_residence: form.docs_residence,
    company_profile: form.docs_profile,
    uploaded_documents: uploadedDocuments,
    applicant_signature: form.signature,
    signature_date: form.signature_date,
  };
}
