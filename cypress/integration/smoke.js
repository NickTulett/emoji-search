/// <reference types="Cypress" />


describe('Emoji Search Tests', () => {

    
    const matchEmojis = (emojiMatcher) => {
        //set up data
        cy.readFile('src/emojiList.json').then((EMOJI_FULL_LIST) => {
            
            const EMOJI_HAS_MATCH = (EMOJI) => 
                !!EMOJI.keywords.match(emojiMatcher) || !!EMOJI.title.match(emojiMatcher)
            const EMOJI_MATCHES = EMOJI_FULL_LIST.filter(EMOJI_HAS_MATCH)
            
            //navigate and act
            cy.visit("/emoji-search")
            cy.get("div.component-search-input input")
            .type(emojiMatcher)
            
            //check expected values
            cy.get("div.component-emoji-result-row")
            .should("have.length", EMOJI_MATCHES.length)
            .each(($el, index, $list) => {
                cy.wrap($el)
                .should("have.text", `${EMOJI_MATCHES[index].title}Click to copy emoji`)
                .should("have.html", EMOJI_MATCHES[index].symbol)
            })
            
        })
    }
    
    const TEST_CASES = [
        { "name": "Finds a single emoji", "searchTerm": "100" },
        { "name": "Finds multiple emojis", "searchTerm": "gri" },
        { "name": "Finds zero emojis", "searchTerm": "plop" },
    ]

    TEST_CASES.forEach((TEST_CASE) => {
        it(TEST_CASE.name, () => matchEmojis(TEST_CASE.searchTerm))
    })

})