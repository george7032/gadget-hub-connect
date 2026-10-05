DROP POLICY "Admins can insert products" ON public.products;
DROP POLICY "Admins can update products" ON public.products;
DROP POLICY "Admins can delete products" ON public.products;
DROP POLICY "Admins can read admin emails" ON public.admin_emails;
DROP FUNCTION public.is_admin();

CREATE POLICY "Users can see their own admin row"
ON public.admin_emails FOR SELECT TO authenticated
USING (lower(email) = lower(coalesce(auth.jwt() ->> 'email', '')));

CREATE POLICY "Admins can insert products"
ON public.products FOR INSERT TO authenticated
WITH CHECK (EXISTS (SELECT 1 FROM public.admin_emails a WHERE lower(a.email) = lower(coalesce(auth.jwt() ->> 'email', ''))));

CREATE POLICY "Admins can update products"
ON public.products FOR UPDATE TO authenticated
USING (EXISTS (SELECT 1 FROM public.admin_emails a WHERE lower(a.email) = lower(coalesce(auth.jwt() ->> 'email', ''))))
WITH CHECK (EXISTS (SELECT 1 FROM public.admin_emails a WHERE lower(a.email) = lower(coalesce(auth.jwt() ->> 'email', ''))));

CREATE POLICY "Admins can delete products"
ON public.products FOR DELETE TO authenticated
USING (EXISTS (SELECT 1 FROM public.admin_emails a WHERE lower(a.email) = lower(coalesce(auth.jwt() ->> 'email', ''))));