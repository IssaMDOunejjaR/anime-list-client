export default function Card() {
	return (
		<div className="w-[170px] group relative">
			<div>
				<img
					src="https://cdn.myanimelist.net/r/320x440/images/anime/1228/125011.webp?s=3f3c8911b02f22c7a04caf7b0bb65568"
					alt=""
				/>
			</div>
			<div className="p-2">
				<h3 className="font-semibold">Mob Psycho 100</h3>
				<p className="text-primary text-xs">TMS Entertainment</p>
			</div>
			<div className="hidden group-hover:flex absolute h-full top-0 left-full z-10  w-[250px] px-3 shadow-md text-black">
				<div className="bg-white p-3 flex flex-col w-full relative">
					<span className="absolute top-2 right-full border-8 border-transparent border-r-white z-20"></span>
					<h3 className="font-semibold mb-2">Mob Psycho 100</h3>
					<p className="text-xs text-primary mb-3 overflow-hidden max-h-32 text-ellipsis">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Officia repellendus tenetur doloremque tempora porro
						enim, accusamus eveniet unde quae temporibus, earum
						minus ex velit nihil natus, reiciendis iure. Debitis,
						libero!.Lorem ipsum dolor sit amet consectetur
						adipisicing elit. Officia repellendus tenetur doloremque
						tempora porro enim, accusamus eveniet unde quae
						temporibus, earum minus ex velit nihil natus, reiciendis
						iure. Debitis, libero!.
					</p>
					<div className="flex flex-wrap justify-center mt-auto p-2">
						<span className="text-[10px] px-1">Action</span>
						<span className="text-[10px] px-1">Adventure</span>
						<span className="text-[10px] px-1">Fantasy</span>
						<span className="text-[10px] px-1">Sport</span>
						<span className="text-[10px] px-1">Fantasy</span>
						<span className="text-[10px] px-1">Adventure</span>
					</div>
					<a href="#" className="custom-link">
						More
					</a>
				</div>
			</div>
		</div>
	);
}
