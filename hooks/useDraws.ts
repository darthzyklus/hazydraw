import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../utils/supabaseClient";

const useDraws = () => {
  const [loading, setLoading] = useState(true);
  const [draws, setDraws] = useState<any>();
  const { session } = useAuth();

  useEffect(() => {
    const getDraws = async () => {
      try {
        const { data, error } = await supabase
          .from("draws")
          .select("*")
          .eq("user_id", session.user.id);

        if (error) throw error;
        setDraws(data);
      } catch (error) {
        console.error(error.message);
      }

      setLoading(false);
    };

    getDraws();
  }, [session]);

  return { draws, loading };
};

export default useDraws;
