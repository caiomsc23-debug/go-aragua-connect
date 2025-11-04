import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import defaultLogo from "@/assets/logo-go-araguaina.png";

export const useSiteLogo = () => {
  const [logo, setLogo] = useState<string>(defaultLogo);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLogo();

    // Subscribe to changes
    const channel = supabase
      .channel('site_content_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'site_content',
          filter: 'key=eq.site_logo'
        },
        () => {
          loadLogo();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadLogo = async () => {
    try {
      const { data, error } = await supabase
        .from("site_content")
        .select("value")
        .eq("key", "site_logo")
        .maybeSingle();

      if (error) throw error;

      if (data?.value) {
        const value = data.value as any;
        if (value.url) {
          setLogo(value.url);
        }
      }
    } catch (error) {
      console.error("Error loading logo:", error);
    } finally {
      setLoading(false);
    }
  };

  return { logo, loading };
};
