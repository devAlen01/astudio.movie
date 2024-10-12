import { useHeaderStore } from "@/stores/useHeaderStore";
import scss from "./KeenSlider.module.scss";
import { useKeenSlider } from "keen-slider/react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

const KeenSlider = ({ data }: { data: IPopular | ITopRated | ITrending }) => {
  const { isMobile } = useHeaderStore();
  const router = useRouter();

  const [ref] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "free",
    slides: {
      perView: isMobile ? 3.3 : 5,
      spacing: 15,
    },
  });
  return (
    <div ref={ref} className="keen-slider">
      {data?.results.map((item) => (
        <div key={item.id} className="keen-slider__slide">
          <div
            className={scss.slider}
            onClick={() => router.push(`/movie/${item.id}`)}
          >
            {/* <img
              src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
              alt="poster"
            /> */}
            <h4 className={scss.title}>{item.original_title || item.name}</h4>
            <span className={scss.date}>
              {dayjs(item?.release_date || item?.first_air_date).format(
                "MMM D, YYYY"
              )}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KeenSlider;
