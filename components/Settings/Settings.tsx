import { Avatar } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	Dispatch,
	Fragment,
	SetStateAction,
	useEffect,
	useRef,
	useState,
} from "react";
import { updateUser } from "../../fetchers/user";
import { useCharacters } from "../../hooks/useCharacters";
import { useLoggedUser } from "../../hooks/useLoggedUser";
import GradientBorder from "../GradientBorder/GradientBorder";
import Modal from "../Modal/Modal";

interface Props {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Settings({ open, setOpen }: Props) {
	const { data: me } = useLoggedUser();
	const [username, setUsername] = useState("");
	const [avatar, setAvatar] = useState("");
	const [searchValue, setSearchValue] = useState("");
	const [scrollY, setScrollY] = useState(0);
	const { data: characters, fetchNextPage } = useCharacters(searchValue);

	const divRef = useRef<HTMLDivElement>(null);

	const { mutate } = useMutation(updateUser);

	const queryClient = useQueryClient();

	useEffect(() => {
		if (me) {
			setUsername(me.username);
			setAvatar(me.avatar);
			if (me.isFirstTime) setOpen(true);
		}
	}, [me]);

	const handleSubmit = (e: any) => {
		e.preventDefault();

		if (me) {
			mutate(
				{
					username,
					avatar,
					isFirstTime: me.isFirstTime ? false : me.isFirstTime,
				},
				{
					onSuccess: (_) => {
						queryClient.invalidateQueries(["logged-user"]);
						setOpen(false);
					},
					onError: (err) => console.log(err),
				}
			);
		}
	};

	useEffect(() => {
		if (
			divRef &&
			divRef.current &&
			divRef.current.clientHeight / 2 < scrollY
		) {
			fetchNextPage();
		}
	}, [divRef, scrollY]);

	if (!me) return null;

	return (
		<Modal open={open} onClose={() => setOpen(false)}>
			<form
				className="min-w-[400px] w-[45vw] max-w-[600px] bg-white dark:bg-primary dark:text-white flex flex-col items-center gap-y-4 p-6"
				onSubmit={handleSubmit}
			>
				<h3 className="text-lg md:text-2xl font-semibold uppercase">
					Settings
				</h3>
				<div className="w-full">
					<input
						type="text"
						className="custom-input"
						placeholder="Username"
						value={username}
						onChange={(e: any) => setUsername(e.target.value)}
					/>
				</div>
				<div className="mb-4 w-full">
					<div className="w-full">
						<input
							type="text"
							className="custom-input"
							placeholder="Search character..."
							value={searchValue}
							onChange={(e: any) =>
								setSearchValue(e.target.value)
							}
						/>
					</div>
					<div
						ref={divRef}
						className="flex flex-wrap gap-2 justify-center py-1 h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-400 dark:scrollbar-thumb-gray-600"
						onScroll={(_) =>
							setScrollY(
								Number(divRef?.current?.scrollHeight) + 150
							)
						}
					>
						{characters &&
							characters.pages.map((page, index) => (
								<Fragment key={index}>
									{page.characters.map((character, index) => (
										<div
											key={index}
											className={`cursor-pointer ${
												character.image.large === avatar
													? "bg-white"
													: null
											} p-1 rounded-sm transition-all hover:bg-white`}
											onClick={() =>
												setAvatar(character.image.large)
											}
										>
											<Avatar
												className="!w-14 !h-14"
												src={character.image.large}
												alt={character.name.full}
											/>
										</div>
									))}
								</Fragment>
							))}
					</div>
				</div>
				<GradientBorder>
					<button className="custom-button-gradient dark:bg-primary hover:bg-transparent !px-12">
						Save
					</button>
				</GradientBorder>
			</form>
		</Modal>
	);
}
