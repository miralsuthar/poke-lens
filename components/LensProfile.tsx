const LensProfile = ({ data }: { data: any }) => {
  return (
    <div className="flex items-center gap-5 border border-white bg-gray-900 p-3 rounded-xl">
      <div className="w-12 h-12 rounded-full overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={data?.defaultProfile?.picture?.original.url}
        />
      </div>
      <div>
        <h1>{data?.defaultProfile.name}</h1>
      </div>
    </div>
  );
};

export default LensProfile;
