import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { actions } from "../slices/poll"
import Card from "./Card"

export default function PreviousRulings ()
{
    const data     = useSelector( state => state.poll.data )
    const dispatch = useDispatch()
    const [ layoutSelected, setLayoutSelected ] = useState( 'grid' )

    function updateVote( vote: string, name: string )
    {
        dispatch( actions.addVote({ name, vote }))
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
                        layoutSelected={ layoutSelected }
                        onVote={ updateVote }
                    />
            })
    }

    return (
        <div>
            <div className="flex justify-between items-center">
                <h3 className="text-gray-600 text-[28px] md:text-[24px] md:leading-[28.8px] xl:text-[45px] font-light leading-7">Previous Rulings</h3>

                <div className="hidden md:block relative">
                    <img 
                        src="/img/triangle.svg" 
                        alt="triangle icon" 
                        className="absolute top-[10px] xl:top-[14px] right-[14px] pointer-events-none"
                    />

                    <label htmlFor="selectLayout" aria-description="Allow for selecting card layout as a List or a Grid but doesn't change the content" className="w-0 h-0 overflow-hidden text-[0px]">Select Layout</label>
                    <select 
                        id="selectLayout"
                        value={ layoutSelected }
                        className="
                            w-[131px] xl:w-[173px] 
                            h-[28px] md:h-[28px] xl:h-[36px] 
                            border-2 border-[rgba(51,51,51,1)] 
                            text-[rgba(51,51,51,1)] text-center text-[10.5px] xl:text-[13.5px] 
                            appearance-none
                        " 
                        data-testid="layoutSelector"
                        onChange={event => setLayoutSelected( event.target.value )}
                    >
                        <option value="list">List</option>
                        <option value="grid">Grid</option>
                    </select>
                </div>
            </div>

            <div className="cards-container w-[100vw] md:w-full -mx-4 md:mx-0 mt-6 md:mt-[29px] xl:mt-8">
                <div 
                    className={[ "flex flex-row w-full gap-4 md:gap-[21px] xl:gap-[27px] overflow-x-auto snap-x snap-mandatory touch-pan-x", layoutSelected === 'list' ? 'md:flex md:flex-col' : 'md:grid md:grid-cols-2 xl:grid-cols-3' ].join( ' ' )}
                >
                    { renderCards() }
                </div>
            </div>
        </div>
    )
}
