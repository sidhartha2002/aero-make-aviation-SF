import {createContext, useContext, useState} from "react";

const Context = createContext();

export const PlayProvider = ({children}) => {
	const [play, setPlay] = useState(false);
	const [menu, setMenu] = useState(false);
	const [preview, setPreview] = useState(false);
	const [end, setEnd] = useState(false);
	const [hasScroll, setHasScroll] = useState(false);

	return (
		<Context.Provider
			value={{
				play,
				setPlay,
				menu,
				setMenu,
				preview,
				setPreview,
				end,
				setEnd,
				hasScroll,
				setHasScroll,
			}}
		>
			{children}
		</Context.Provider>
	);
};

export const usePlay = () => {
	const context = useContext(Context);

	if (context === undefined) {
		throw new Error("usePlay must be used within a PlayProvider");
	}

	return context;
};
