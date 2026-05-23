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
export type RegistrationInsert = {
  first_name: string;
  last_name: string;
  date_of_birth: string; // send as "YYYY-MM-DD" (Postgres date)
  gender: string;
  email_address: string;
  phone_number: string;
  alternative_phone_number?: string;
  business_name?: string;
  registration_number?: string;
  business_type?: string;
  industry_sector?: string;
  business_address?: string;
  number_of_employees?: number | null;
  membership_category: string;
  motivation_for_joining: string;
  copy_of_id_or_passport: boolean;
  business_registration_documents: boolean;
  proof_of_residence: boolean;
  company_profile: boolean;
  uploaded_documents?: string[]; // <= must be string[] (filenames/paths) AFTER upload
  applicant_signature: string;
  signature_date: string;
  // Optional if you let defaults handle it
  // application_status?: string;
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
