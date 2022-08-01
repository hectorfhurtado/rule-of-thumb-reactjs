import { useSelector } from "react-redux"
import Card from "./Card"

export default function PreviousRulings ()
{
    const data = useSelector( state => state.poll.data )

    function updateVote( vote: string, name: string )
    {
        console.log( 'updateVote ', vote, name )
    }

    function renderCards()
    {
        return data.map( cardData =>
            {
                return <Card 
                        name={ cardData.name }
                        key={ cardData.name }
                        picture={ cardData.picture }
                        description={ cardData.description }
                        category={ cardData.category }
                        votesPositive={ cardData.votes.positive }
                        votesNegative={ cardData.votes.negative }
                        lastUpdated={ cardData.lastUpdated }
                        onVote={ updateVote }
                    />
            })
    }

    return (
        <div>
            <div className="flex justify-between items-center">
                <h3 className="text-gray-600 text-[28px] md:text-[24px] md:leading-[28.8px] xl:text-[45px] font-light leading-7">Previous Rulings</h3>

            </div>

            <div className="cards-container w-[100vw] md:w-full -mx-4 md:mx-0 mt-6 md:mt-[29px] xl:mt-8">
                <div 
                    className="flex flex-row w-full gap-4 md:gap-[21px] xl:gap-[27px] overflow-x-auto snap-x snap-mandatory touch-pan-x"
                >
                    { renderCards() }
                </div>
            </div>
        </div>
    )
}
