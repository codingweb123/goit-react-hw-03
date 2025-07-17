import { useState } from "react"
import css from "./App.module.css"
import CafeInfo from "../CafeInfo/CafeInfo"
import Notification from "../Notification/Notification"
import VoteOptions from "../VoteOptions/VoteOptions"
import VoteStats from "../VoteStats/VoteStats"
import { type Votes, type VoteType } from "../../types/votes"

export default function App() {
	const defaultVotes: Votes = {
		good: 0,
		neutral: 0,
		bad: 0,
	}
	const [votes, setVotes] = useState<Votes>(defaultVotes)
	const updateVote = (key: VoteType) => {
		setVotes({
			...votes,
			[key]: votes[key] + 1,
		})
	}
	const resetVotes = () => {
		setVotes(defaultVotes)
	}

	const totalVotes = votes.good + votes.neutral + votes.bad
	const canReset = totalVotes > 0
	const positiveRate = totalVotes
		? Math.round((votes.good / totalVotes) * 100)
		: 0

	return (
		<div className={css.app}>
			<CafeInfo />
			<VoteOptions
				onVote={updateVote}
				onReset={resetVotes}
				canReset={canReset}
			/>
			{totalVotes > 0 ? (
				<VoteStats
					votes={votes}
					totalVotes={totalVotes}
					positiveRate={positiveRate}
				/>
			) : (
				<Notification />
			)}
		</div>
	)
}
