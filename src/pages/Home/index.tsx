import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import Social from "../../components/Social";
import { useEffect, useState } from "react";
import { db } from "../../services/firebaseConnection";
import {
  getDocs,
  getDoc,
  query,
  collection,
  orderBy,
  doc,
} from "firebase/firestore";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";

interface LinkProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}

interface SocialLinksProps {
  facebook: string;
  instagram: string;
  youtube: string;
}

const Home = () => {
  const [links, setLinks] = useState<LinkProps[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLinksProps>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function loadLinks() {
      const linksRef = collection(db, "links");
      const queryRef = query(linksRef, orderBy("created", "asc"));

      getDocs(queryRef).then((snapshot) => {
        let lista = [] as LinkProps[];

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            name: doc.data().name,
            url: doc.data().url,
            bg: doc.data().bg,
            color: doc.data().color,
          });
        });

        setLinks(lista);
        setLoading(false);
      });
    }

    loadLinks();
  }, []);

  useEffect(() => {
    function loadSocialLinks() {
      const docRef = doc(db, "social", "link");

      getDoc(docRef).then((snapshot) => {
        if (snapshot.data() !== undefined) {
          setSocialLinks({
            facebook: snapshot.data()?.facebook,
            instagram: snapshot.data()?.instagram,
            youtube: snapshot.data()?.youtube,
          });
        }
      });
    }

    loadSocialLinks();
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col w-full py-4 items-center justify-center">
      <h1 className="md:text-4xl text-3x1 font-bold text-white mt-20">
        Sujeito programador
      </h1>
      <span className="text-gray-50 mb-5 mt-3">Veja meus links</span>

      <main className="flex flex-col w-11/12 max-w-xl text-center">
        {links.map((link) => (
          <section
            key={link.id}
            className="bg-white mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105 cursor-pointer"
            style={{ backgroundColor: link.bg }}
          >
            <a href={link.url} target="_blank">
              <p className="text-base md:text-lg" style={{ color: link.color }}>
                {link.name}
              </p>
            </a>
          </section>
        ))}

        {socialLinks && Object.keys(socialLinks).length > 0 && (
          <footer className="flex justify-center gap-3 my-4">
            <Social url={socialLinks.facebook}>
              <FaFacebook size={35} color="#fff" />
            </Social>
            <Social url={socialLinks.instagram}>
              <FaInstagram size={35} color="#fff" />
            </Social>
            <Social url={socialLinks.youtube}>
              <FaYoutube size={35} color="#fff" />
            </Social>
          </footer>
        )}

        <div className="w-full flex justify-end">
          <Link to="/login" className="bg-white w-24 rounded-2xl cursor-pointer font-medium">Login</Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
