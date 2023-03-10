import { Watchlist } from "@/modules/watchlist";
import { NextPage } from "next";

const WatchlistPage: NextPage = () => {
  return (
    <div className="flex flex-col">
      <Watchlist />
    </div>
  );
};

export default WatchlistPage;
