-- Create companies table
CREATE TABLE public.companies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  cnpj TEXT NOT NULL UNIQUE,
  razao_social TEXT NOT NULL,
  nome_fantasia TEXT NOT NULL,
  data_abertura DATE NOT NULL,
  email TEXT NOT NULL,
  porte TEXT NOT NULL,
  cnaes TEXT NOT NULL,
  natureza_juridica TEXT NOT NULL,
  endereco TEXT NOT NULL,
  nome_responsavel TEXT NOT NULL,
  cpf_responsavel TEXT NOT NULL,
  telefone_responsavel TEXT NOT NULL,
  cargo_responsavel TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Companies can view their own data" 
ON public.companies 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can insert companies" 
ON public.companies 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins can update companies" 
ON public.companies 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete companies" 
ON public.companies 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_companies_updated_at
BEFORE UPDATE ON public.companies
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();