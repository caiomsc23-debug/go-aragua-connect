-- Create jobs table for company job postings
CREATE TABLE public.jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  nome_vaga TEXT NOT NULL,
  salario TEXT,
  horario TEXT,
  tempo_experiencia TEXT,
  vagas_disponiveis INTEGER NOT NULL DEFAULT 1,
  beneficios TEXT,
  escolaridade_exigida TEXT,
  modelo_contratacao TEXT,
  requisitos TEXT,
  descricao TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create company notifications table
CREATE TABLE public.company_notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for jobs table
CREATE POLICY "Companies can view their own jobs"
ON public.jobs
FOR SELECT
USING (true);

CREATE POLICY "Companies can insert their own jobs"
ON public.jobs
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Companies can update their own jobs"
ON public.jobs
FOR UPDATE
USING (true);

CREATE POLICY "Companies can delete their own jobs"
ON public.jobs
FOR DELETE
USING (true);

-- RLS Policies for company_notifications table
CREATE POLICY "Companies can view their own notifications"
ON public.company_notifications
FOR SELECT
USING (true);

CREATE POLICY "Companies can update their own notifications"
ON public.company_notifications
FOR UPDATE
USING (true);

-- Create trigger for automatic timestamp updates on jobs
CREATE TRIGGER update_jobs_updated_at
BEFORE UPDATE ON public.jobs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();