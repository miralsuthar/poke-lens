import { ConnectWallet } from "@thirdweb-dev/react";
import { NextPage } from "next";
import { GET_PROFILE } from "../utils/api";
import { useQuery } from "@apollo/client";
import { useAddress } from "@thirdweb-dev/react";
import Link from "next/link";
import LensProfile from "../components/LensProfile";

const Home: NextPage = () => {
  const address = useAddress();

  const { loading, data, error } = useQuery(GET_PROFILE, {
    variables: { id: "0x524C91dd7902827cb51119F018FD560237985d3A" },
  });

  if (loading) return <h1>Loading...</h1>;

  return (
    <main className="flex justify-center flex-col gap-10 items-center h-screen">
      {address && data.defaultProfile ? (
        <LensProfile data={data} />
      ) : (
        <h1>No Lens profile found</h1>
      )}
      <ConnectWallet
        dropdownPosition={{
          side: "bottom",
          align: "center",
        }}
      />
      {address && data.defaultProfile && (
        <Link
          href="/questions"
          className="bg-white px-3 py-1 hover:scale-105 transition-all font-medium text-xl text-black rounded-lg"
        >
          Get your PokeLens
        </Link>
      )}
    </main>
  );
};

export default Home;
