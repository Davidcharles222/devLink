import { ReactNode } from "react";
import { auth } from "../services/firebaseConnection";
import { onAuthStateChanged } from "firebase/auth"; // função firebase para observar se usuário está logado

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

interface PrivateProps {
  children: ReactNode;
}

const Private = ({ children }: PrivateProps): any => {
  const [loading, setLoading] = useState(true);
  const [signed, setSigned] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = {
          uid: user?.uid,
          email: user?.email,
        };

        localStorage.setItem("@reactlinks", JSON.stringify(userData));

        setLoading(false);
        setSigned(true);
      } else {
        setLoading(false);
        setSigned(false);
      }
    });

    return () => {
      //parar de monitorar
      unsub();
    };
  }, []);

  if(loading){
    return <Loading />
  }
 

  if (!signed) {
    return navigate("/login");
  }

  return children;
};

export default Private;
