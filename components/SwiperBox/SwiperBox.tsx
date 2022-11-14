import {
	Dispatch,
	ReactNode,
	SetStateAction,
	useEffect,
	useState,
} from "react";
import type Swiper from "swiper";
import { Swiper as SwiperContainer } from "swiper/react";

import "swiper/css";

export default function SwiperBox({
	children,
	activeSlide,
	setActiveSilde,
}: {
	children: ReactNode;
	activeSlide: number;
	setActiveSilde: Dispatch<SetStateAction<number>>;
}) {
	const [swiper, setSwiper] = useState<Swiper | null>(null);

	useEffect(() => {
		if (swiper) swiper.slideTo(activeSlide);
	}, [activeSlide]);

	return (
		<SwiperContainer
			slidesPerView="auto"
			spaceBetween={30}
			className="w-full"
			onSwiper={setSwiper}
			onActiveIndexChange={(swiperProps) =>
				setActiveSilde(swiperProps.activeIndex)
			}
		>
			{children}
		</SwiperContainer>
	);
}
