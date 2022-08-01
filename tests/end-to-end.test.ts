import { test, expect } from '@playwright/test';

const URL = 'http://localhost:3000/'

test.describe( 'Homepage tests', async () =>
{
    test( 'it just passes ', () =>
    {
        expect( true ).toEqual( true )
    })

    test.beforeEach(async ({ page }) =>
    {
        await page.goto( URL )
    })

    test( 'shows the "Previous Rulings" section', async ({ page }) =>
    {
        await expect( page.locator( 'data-testid=previewtitle' )).toContainText( 'Previous Rulings' )
    })

    
    test( 'finds the layout selector element', async ({ page }) =>
    {
        expect( await page.locator( 'data-testid=layoutSelector' )).toBeTruthy()
    })

    test.describe( 'card assertions', async () => {
        test( 'finds at least one card', async ({ page }) => {
            expect( await page.locator( 'data-testid=card' )).toBeTruthy()
        })

        test.skip( 'finds a name inside a card', async ({ page }) => {
            const $card = await page.locator( 'data-testid=card' )
            const $name = await $card.nth( 0 ).locator( 'data-testid=cardname' )

            expect( await $name.textContent() ).not.toBeFalsy()
        })

        test( 'finds a description inside a card', async ({ page }) => {
            const $card        = await page.locator( 'data-testid=card' )
            const $description = await $card.nth( 0 ).locator( 'data-testid=carddescription' )

            expect( await $description.textContent() ).not.toBeFalsy()
        })

        test( 'finds a gauge with percentage numbers inside a card', async ({ page }) => {
            const $card  = await page.locator( 'data-testid=card' )
            const $gauge = await $card.nth( 0 ).locator( 'data-testid=cardgauge' )

            expect( await $gauge ).toBeTruthy()

            const $paragraph = await $gauge.locator( 'p' )
            expect( await $paragraph.count() ).toEqual( 2 )

            expect( await $paragraph.nth( 0 ).textContent() ).toContain( '%' )
            expect( await $paragraph.nth( 1 ).textContent() ).toContain( '%' )
        })

        test( 'finds a thumb icon above the image inside a card', async ({ page }) => {
            const $card      = await page.locator( 'data-testid=card' )
            const $thumbicon = await $card.nth( 0 ).locator( 'data-testid=cardimagethumbicon' )

            expect( await $thumbicon.count() ).toBeGreaterThan( 0 )
        })

        test( 'finds a person image inside a card', async ({ page }) => {
            const $card        = await page.locator( 'data-testid=card' )
            const $personImage = await $card.nth( 0 ).locator( 'data-testid=cardpersonimage' )

            expect( await $personImage.getAttribute( 'src' )).toContain( '.png' )
        })

        test( 'finds a thumb up and down button inside a card', async ({ page }) => {
            const $card = await page.locator( 'data-testid=card' )

            expect( await await $card.nth( 0 ).locator( 'data-testid=cardvoteup' )).toBeTruthy()
            expect( await await $card.nth( 0 ).locator( 'data-testid=cardvotedown' )).toBeTruthy()
        })

        test( 'finds an eyebrow text with the category in it inside a card', async ({ page }) => {
            const $card    = await page.locator( 'data-testid=card' )
            const $eyebrow = await $card.nth( 0 ).locator( 'data-testid=cardeyebrow' )

            expect( $eyebrow ).toBeTruthy()
            expect( await $eyebrow.textContent() ).not.toBeFalsy()
            expect( await $eyebrow.textContent() ).toContain( ' in ' )
        })
        
        test( 'finds a disabled Vote Now button inside a card', async ({ page }) => {
            const $card    = await page.locator( 'data-testid=card' )
            const $votenow = await $card.nth( 0 ).locator( 'data-testid=cardvotenow' )

            expect( $votenow ).toBeTruthy()
            expect( await $votenow.isDisabled() ).toEqual( true )
            expect( await $votenow.textContent() ).toContain( 'Vote Now' )
        })

        test.describe( 'when clicking the thumb up button', () => {
            let $card = null

            test.beforeEach( async ({ page }) =>
            {
                $card = await page.locator( 'data-testid=card' )
            })

            test( 'outlines the clicked button with a white border', async () => {
                const $voteup = await $card.nth( 0 ).locator( 'data-testid=cardvoteup' )

                expect( await $voteup.evaluate( node => node.classList.contains( 'border-2' )) ).toEqual( false )

                await $voteup.click()

                expect( await $voteup.evaluate( node => node.classList.contains( 'border-2' )) ).toEqual( true )
            })

            test( 'enables the Vote Now button', async () => {
                const $voteup = await $card.nth( 0 ).locator( 'data-testid=cardvoteup' )

                await $voteup.click()

                const $votenow = await $card.nth( 0 ).locator( 'data-testid=cardvotenow' )

                expect( await $votenow.isDisabled() ).toEqual( false )
            })

            test.describe( 'When clicking the Vote Now button', () => {
                let gaugeText1 = null
                let gaugeText2 = null

                test.beforeEach( async () =>
                {
                    gaugeText1 = await $card.nth( 0 ).locator( 'data-testid=cardgauge' ).locator( 'p' ).first().textContent()
                    gaugeText2 = await $card.nth( 0 ).locator( 'data-testid=cardgauge' ).locator( 'p' ).last().textContent()

                    const $voteup = await $card.nth( 0 ).locator( 'data-testid=cardvoteup' )
                    await $voteup.click()
                    
                    const $votenow = await $card.nth( 0 ).locator( 'data-testid=cardvotenow' )
                    await $votenow.click()
                })

                test( 'hides thumb up and down buttons', async () => {
                    const $voteup   = await $card.nth( 0 ).locator( 'data-testid=cardvoteup' )
                    const $votedown = await $card.nth( 0 ).locator( 'data-testid=cardvotedown' )

                    expect( await $voteup.isHidden() ).toEqual( true )
                    expect( await $votedown.isHidden() ).toEqual( true )
                })

                test( 'changes the eyebrow text for Thank you', async () => {
                    const $eyebrow = await $card.nth( 0 ).locator( 'data-testid=cardeyebrow' )

                    expect( await $eyebrow.textContent() ).toContain( 'Thank you for voting!' )
                })

                test( 'changes the text from Vote Now to Vote again', async () => {
                    const $votenow = await $card.nth( 0 ).locator( 'data-testid=cardvotenow' )

                    expect( await $votenow.textContent() ).toContain( 'Vote Again' )
                })

                test( 'changes the gauge text', async () => {
                    const $gaugeText1 = await $card.nth( 0 ).locator( 'data-testid=cardgauge' ).locator( 'p' ).first()
                    const $gaugeText2 = await $card.nth( 0 ).locator( 'data-testid=cardgauge' ).locator( 'p' ).last()

                    expect( await $gaugeText1.textContent() ).not.toEqual( gaugeText1 )
                    expect( await $gaugeText2.textContent() ).not.toEqual( gaugeText2 )
                })

                test.describe( 'when clicking the Vote Again button', () => {
                    test.beforeEach( async () =>
                    {
                        const $votenow = await $card.nth( 0 ).locator( 'data-testid=cardvotenow' )
                        await $votenow.click()
                    })

                    test( 'shows thumb up and down buttons again', async () => {
                        const $voteup   = await $card.nth( 0 ).locator( 'data-testid=cardvoteup' )
                        const $votedown = await $card.nth( 0 ).locator( 'data-testid=cardvotedown' )

                        expect( await $voteup.isVisible() ).toEqual( true )
                        expect( await $votedown.isVisible() ).toEqual( true )
                    })

                    test( 'updates the eyebrow text', async () => {
                        const $eyebrow = await $card.nth( 0 ).locator( 'data-testid=cardeyebrow' )

                        expect( await $eyebrow.textContent() ).toContain( 'now in' )
                    })

                    test( 'disables the Vote Now button', async () => {
                        const $votenow = await $card.nth( 0 ).locator( 'data-testid=cardvotenow' )

                        expect( await $votenow.isDisabled() ).toEqual( true )
                    })

                    test( 'updates the Vote Now button text to Vote Now', async () => {
                        const $votenow = await $card.nth( 0 ).locator( 'data-testid=cardvotenow' )

                        expect( await $votenow.textContent() ).toContain( 'Vote Now' )
                    })
                })
            })
        })

        test.describe( 'when clicking the thumb down button', () => {
            let $card = null

            test.beforeEach( async ({ page }) =>
            {
                $card = await page.locator( 'data-testid=card' )
            })

            test( 'outlines the clicked button with a white border', async () => {
                const $votedown = await $card.nth( 0 ).locator( 'data-testid=cardvotedown' )

                expect( await $votedown.evaluate( node => node.classList.contains( 'border-2' )) ).toEqual( false )

                await $votedown.click()

                expect( await $votedown.evaluate( node => node.classList.contains( 'border-2' )) ).toEqual( true )
            })

            test( 'enables the Vote Now button', async () => {
                const $votedown = await $card.nth( 0 ).locator( 'data-testid=cardvotedown' )

                await $votedown.click()

                const $votenow = await $card.nth( 0 ).locator( 'data-testid=cardvotenow' )

                expect( await $votenow.isDisabled() ).toEqual( false )
            })

            test.describe( 'When clicking the Vote Now button', () => {
                let gaugeText1 = null
                let gaugeText2 = null

                test.beforeEach( async () =>
                {
                    gaugeText1 = await $card.nth( 0 ).locator( 'data-testid=cardgauge' ).locator( 'p' ).first().textContent()
                    gaugeText2 = await $card.nth( 0 ).locator( 'data-testid=cardgauge' ).locator( 'p' ).last().textContent()

                    const $votedown = await $card.nth( 0 ).locator( 'data-testid=cardvoteup' )
                    await $votedown.click()
                    
                    const $votenow = await $card.nth( 0 ).locator( 'data-testid=cardvotenow' )
                    await $votenow.click()
                })

                test( 'hides thumb up and down buttons', async () => {
                    const $voteup   = await $card.nth( 0 ).locator( 'data-testid=cardvoteup' )
                    const $votedown = await $card.nth( 0 ).locator( 'data-testid=cardvotedown' )

                    expect( await $voteup.isHidden() ).toEqual( true )
                    expect( await $votedown.isHidden() ).toEqual( true )
                })

                test( 'changes the eyebrow text for Thank you', async () => {
                    const $eyebrow = await $card.nth( 0 ).locator( 'data-testid=cardeyebrow' )

                    expect( await $eyebrow.textContent() ).toContain( 'Thank you for voting!' )
                })

                test( 'changes the text from Vote Now to Vote again', async () => {
                    const $votenow = await $card.nth( 0 ).locator( 'data-testid=cardvotenow' )

                    expect( await $votenow.textContent() ).toContain( 'Vote Again' )
                })

                test( 'changes the gauge text', async () => {
                    const $gaugeText1 = await $card.nth( 0 ).locator( 'data-testid=cardgauge' ).locator( 'p' ).first()
                    const $gaugeText2 = await $card.nth( 0 ).locator( 'data-testid=cardgauge' ).locator( 'p' ).last()

                    expect( await $gaugeText1.textContent() ).not.toEqual( gaugeText1 )
                    expect( await $gaugeText2.textContent() ).not.toEqual( gaugeText2 )
                })

                test.describe( 'when clicking the Vote Again button', () => {
                    test.beforeEach( async () =>
                    {
                        const $votenow = await $card.nth( 0 ).locator( 'data-testid=cardvotenow' )
                        await $votenow.click()
                    })

                    test( 'shows thumb up and down buttons again', async () => {
                        const $voteup   = await $card.nth( 0 ).locator( 'data-testid=cardvoteup' )
                        const $votedown = await $card.nth( 0 ).locator( 'data-testid=cardvotedown' )

                        expect( await $voteup.isVisible() ).toEqual( true )
                        expect( await $votedown.isVisible() ).toEqual( true )
                    })

                    test( 'updates the eyebrow text', async () => {
                        const $eyebrow = await $card.nth( 0 ).locator( 'data-testid=cardeyebrow' )

                        expect( await $eyebrow.textContent() ).toContain( 'now in' )
                    })

                    test( 'disables the Vote Now button', async () => {
                        const $votenow = await $card.nth( 0 ).locator( 'data-testid=cardvotenow' )

                        expect( await $votenow.isDisabled() ).toEqual( true )
                    })

                    test( 'updates the Vote Now button text to Vote Now', async () => {
                        const $votenow = await $card.nth( 0 ).locator( 'data-testid=cardvotenow' )

                        expect( await $votenow.textContent() ).toContain( 'Vote Now' )
                    })
                })
            })
        })
    })
})
