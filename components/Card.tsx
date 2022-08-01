import { useState } from "react"
import TimeAgo from 'react-timeago'

export default function Card( props )
{
    const { 
        category,
        description,
        name, 
        picture, 
        votesPositive,
        votesNegative,
        lastUpdated,
        onVote,
    } = props

    const calculatePositive = () => ( votesPositive / ( votesPositive + votesNegative )) * 100
    const calculateNegative = () => ( votesNegative / ( votesPositive + votesNegative )) * 100

    const numericPercentagePositive = calculatePositive()
    const numericPercentageNegative = calculateNegative()

    const isPositive = numericPercentagePositive > numericPercentageNegative
    const isNegative = numericPercentagePositive < numericPercentageNegative

    const [ vote,  setVote ]  = useState( null )
    const [ voted, setVoted ] = useState( false )

    function voteAction()
    {
        setVoted( !voted )

        if ( voted )
            setVote( null )

        if ( voted === false )
            onVote( vote, name )
    }

    return (
        <div 
            className="card w-full relative flex flex-col md:overflow-hidden w-full max-w-[80vw] md:max-w-none shrink-0 snap-center first:ml-4 md:first:ml-0 last:mr-4 md:last:-mr-0" 
            data-testid="card"
            aria-description="A card with a person information: His/Her name, a short description, an photo image of that person. This also allows for giving a thumb up or down throught a Vote Now button. At the bottom of this card there are some numbers showing the overall voting is going as percentages"
        >
            <img 
                alt="name" 
                src={ `/img/${ picture }` }
                className="pointer-none" 
                data-testid="cardpersonimage"
                aria-description="Voted person photo image"
            />

            <div 
                className="absolute bottom-0 w-full bg-gradient-to-t from-[rgba(0,0,0,0.6)] to-[rgba(0,0,0,0.0001)]" 
            >
                <div className="flex flex-col">
                    { /* PERSON INFO */ }
                    <div className="flex mr-[35px]">
                        <div 
                            className={[ "bg-[#FBBD4A] w-[30px] h-[30px] flex items-center justify-center shrink-0 xl:mt-2", isPositive ? 'hidden' : '' ].join(' ') }
                            data-testid="cardimagethumbicon"
                        >
                            <img
                                src="/img/thumbs-down.svg" 
                                alt="Thumbs down icon" 
                                layout='fill'
                            />
                        </div>
                        <div 
                            className={[ "bg-[rgba(60,187,180,0.8)] w-[30px] h-[30px] flex items-center justify-center shrink-0 xl:mt-2", isNegative ? 'hidden' : '' ].join( ' ' )}
                            data-testid="cardimagethumbicon"
                        >
                            <img 
                                src="/img/thumbs-up.svg" 
                                alt="Thumbs up icon" 
                                layout='fill'
                            />
                        </div>
                        <div className="ml-1.5">
                            <h6 
                                className="text-white text-3xl xl:text-[36px]" 
                                data-testid="cardname"
                                aria-description="Name of the person voted"
                            >
                                { name }
                            </h6>

                            <p 
                                className="text-white mt-1.5 text-[15px] md:leading-[18px] xl:leading-[18px] text-ellipsis" 
                                data-testid="carddescription"
                                aria-description="A short description of the person voted"
                            >
                                { description }
                            </p>
                        </div>
                    </div>

                    {/* LAST UPDATED AND CALL TO ACTION */}
                    <div className="mt-3 mr-[35px]">
                        <p 
                            className="text-white text-right text-[12px] font-bold" 
                            data-testid="cardeyebrow"
                        >
                            <span className={ voted ? 'hidden' : '' }><TimeAgo date={ lastUpdated } /> in <span className="capitalize">{ category }</span></span>
                            <span className={ voted ? '' : 'hidden' }>Thank you for voting!</span>
                        </p>
                        
                        <div className="flex justify-end gap-[12px] items-center mt-3">
                            <button 
                                className={[ 
                                    "bg-[rgba(60,187,180,0.8)] w-[30px] h-[30px] flex items-center justify-center shrink-0 border-white", 
                                    vote === 'up' ? 'border-2' : '', 
                                    voted ? 'hidden' : '' 
                                ].join( ' ' )}
                                data-testid="cardvoteup"
                                aria-description="Vote Up button. This enables the Vote Now button for voting"
                                onClick={ () => setVote( 'up' )}
                            >
                                <img 
                                    src="/img/thumbs-up.svg" 
                                    alt="Thumbs up icon" 
                                />
                            </button>
                            <button 
                                className={[ 
                                    "bg-[#FBBD4A] w-[30px] h-[30px] flex items-center justify-center shrink-0 border-white", 
                                    vote === 'down' ? 'border-2' : '',
                                    voted ? 'hidden' : '',
                                ].join( ' ' )}
                                data-testid="cardvotedown"
                                aria-description="Vote Down button. This enables the Vote Now button for voting"
                                onClick={() => setVote( 'down' )}
                            >
                                <img   
                                    src="/img/thumbs-down.svg" 
                                    alt="Thumbs down icon" 
                                />
                            </button>
                            <button 
                                className="
                                    w-[107px] 
                                    flex justify-center items-center 
                                    text-white text-[15px] 
                                    p-2.5 
                                    bg-[rgba(48,48,48,0.6)] hover:bg-[rgba(0,0,0,0.6)] disabled:bg-[rgba(0,0,0,0.6)] 
                                    border border-white
                                "
                                disabled={ vote === null }
                                data-testid="cardvotenow"
                                aria-description="Vote Now button. Disabled by default, it's enabled when clicking on Vote up or Down button. Then you can Vote. After voting, you can Vote again clicking this button in order to reset all values." 
                                onClick={ voteAction }
                            >
                                Vote { voted ? 'Again' : 'Now' }
                            </button>
                        </div>
                    </div>

                    {/* POLL STATISTICS */}
                    <div className="mt-3 h-[36px] relative flex w-full" data-testid="cardgauge">
                        <div 
                            className="bg-[rgba(60,187,180,0.6)] w-full h-full" 
                            style={{ maxWidth: numericPercentagePositive + '%' }}
                        ></div>
                        <div 
                            className="bg-[rgba(249,173,29,0.6)] w-full h-full" 
                            style={{ maxWidth: numericPercentageNegative + '%' }}
                        ></div>

                        <div className="absolute left-3.5 top-1.5 xl:top-0.5 flex items-center">
                            <img 
                                src="/img/thumbs-up.svg" 
                                alt="Thumbs up icon" 
                            />
                            <p 
                                className="text-white text-lg ml-1.5" 
                                aria-description="Percentage of overall positive votes"
                            >
                                { numericPercentagePositive.toFixed( 1 )}%
                            </p>
                        </div>
                        <div className="absolute right-3.5 top-1.5 xl:top-0.5 flex items-center">
                            <p 
                                className="text-white text-lg mr-1.5" 
                                aria-description="Percentage of overall negative votes"
                            >
                                { numericPercentageNegative.toFixed( 1 )}%
                            </p>
                            
                            <img 
                                src="/img/thumbs-down.svg" 
                                alt="Thumbs down icon" 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
