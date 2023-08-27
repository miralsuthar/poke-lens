import { useQuery } from "@apollo/client";
import { GET_PROFILE } from "../utils/api";
import LensProfile from "../components/LensProfile";
import { cn } from "../utils/helper";
import { useEffect, useState } from "react";

const ProgressBarWithLabel = ({
  label,
  max,
  min,
  current,
}: {
  label: string;
  max: number;
  min: number;
  current: number;
}) => {
  const percentage = ((current - min) / (max - min)) * 100;
  console.log("Per: ", percentage);

  return (
    <div className="flex items-center justify-between gap-10">
      <span>{label}</span>
      <div className="relative rounded-lg w-60 h-7 bg-slate-700">
        <div
          className={`absolute transition-all duration-500 rounded-lg h-full bg-green-600`}
          style={{ width: `${percentage}%` }}
        ></div>
        <span className="absolute -bottom-6 left-0">{min}</span>
        <span className="absolute -bottom-6 right-0">{max}</span>
      </div>
    </div>
  );
};

const LevelBar = ({
  isFullfiled1 = false,
  isFullfiled2 = false,
  isFullfiled3 = false,
}: {
  isFullfiled1: boolean;
  isFullfiled2: boolean;
  isFullfiled3: boolean;
}) => {
  return (
    <div className="w-full rounded-md overflow-hidden flex h-10 justify-between text-center">
      <div
        className={cn(
          "bg-slate-400 flex justify-center items-center h-full w-full",
          isFullfiled1 && "bg-slate-700"
        )}
      >
        Level1
      </div>
      <div
        className={cn(
          "bg-slate-400 w-full  flex justify-center items-center h-full",
          isFullfiled2 && "bg-slate-700"
        )}
      >
        Level2
      </div>
      <div
        className={cn(
          "bg-slate-400 w-full  flex justify-center items-center h-full",
          isFullfiled3 && "bg-slate-700"
        )}
      >
        Level3
      </div>
    </div>
  );
};

const Page = () => {
  const [followers, setFollowers] = useState<number>(0);
  const [posts, setPosts] = useState<number>(0);
  const [comments, setComments] = useState<number>(0);
  const [mirrors, setMirrors] = useState<number>(0);
  const [collects, setCollects] = useState<number>(0);

  const { loading, data, error } = useQuery(GET_PROFILE, {
    variables: { id: "0x524C91dd7902827cb51119F018FD560237985d3A" },
  });

  useEffect(() => {
    setFollowers(data?.defaultProfile?.stats?.totalFollowers);
    setPosts(data?.defaultProfile?.stats?.totalPosts);
    setComments(data?.defaultProfile?.stats?.totalComments);
    setMirrors(data?.defaultProfile.stats?.totalMirrors);
    setCollects(data?.defaultProfile?.stats?.totalCollects);
  }, [data]);

  const isLevel1 = () => {
    if (
      followers >= 0 &&
      posts >= 0 &&
      comments >= 0 &&
      mirrors >= 0 &&
      collects >= 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  const isLevel2 = () => {
    if (
      followers >= 100 &&
      posts >= 500 &&
      comments >= 500 &&
      mirrors >= 50 &&
      collects >= 10
    ) {
      return true;
    } else {
      return false;
    }
  };

  const isLevel3 = () => {
    if (
      followers >= 1000 &&
      posts >= 5000 &&
      comments >= 5000 &&
      mirrors >= 500 &&
      collects >= 50
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <main className="h-screen w-screen flex relative">
      <div className="absolute top-5 right-5">
        <LensProfile data={data} />
      </div>
      <div className="flex px-10 flex-col bg-slate-50 items-center justify-center gap-10">
        <div className="bg-slate-900 w-max p-10 rounded-xl space-y-10">
          <div>
            <LevelBar
              isFullfiled1={isLevel1()}
              isFullfiled2={isLevel2()}
              isFullfiled3={isLevel3()}
            />
          </div>
          <ProgressBarWithLabel
            min={0}
            max={isLevel3() ? 10000 : isLevel2() ? 1000 : 100}
            current={followers}
            label="Followers"
          />
          <ProgressBarWithLabel
            min={0}
            max={isLevel3() ? 10000 : isLevel2() ? 5000 : 500}
            current={posts}
            label="Posts"
          />
          <ProgressBarWithLabel
            min={0}
            max={isLevel3() ? 10000 : isLevel2() ? 5000 : 500}
            current={comments}
            label="Comments"
          />
          <ProgressBarWithLabel
            min={0}
            max={isLevel3() ? 1000 : isLevel2() ? 500 : 50}
            current={mirrors}
            label="Mirrors"
          />
          <ProgressBarWithLabel
            min={0}
            max={isLevel3() ? 100 : isLevel2() ? 50 : 10}
            current={collects}
            label="Collects"
          />
        </div>
        <button
          disabled={true}
          className="rounded-lg px-3 py-1 text-lg font-medium disabled:opacity-50 bg-blue-500"
        >
          Upgrade your nft
        </button>
      </div>
      <div className="flex-1 flex-col gap-10 flex justify-center items-center h-full w-full">
        <img
          src="/images/nft.jpg"
          className="w-6/12 object-cover rounded-lg"
          alt=""
        />
        <button className="rounded-lg px-3 py-1 text-lg font-medium disabled:opacity-50 bg-green-500">
          Share on lens
        </button>
      </div>
    </main>
  );
};

export default Page;
