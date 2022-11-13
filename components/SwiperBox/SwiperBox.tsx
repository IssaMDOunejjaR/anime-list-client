import { ReactNode } from "react";
import { Swiper } from "swiper/react";

export default function SwiperBox({ children }: { children: ReactNode }) {
	return <Swiper slidesPerView="auto">{children}</Swiper>;
}
