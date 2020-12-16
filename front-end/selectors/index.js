import { createSelector } from 'reselect'

const getLinksState = state => state.links
const getCategoryState = state => state.categories

//createUniqueIDs return creates set of ids from given links
const createUniqueIDs = (links) => new Set (links.map(item => item.id))

// getUniqueLinks return an array of links with unique id from given links
const getUniqueLinks = (links) => {

   const ids= createUniqueIDs(links)

  return Array.from(ids).map(id =>links.find(link => link.id === id  ) )
}

//selectLinks returns an array of links that have a hidden field of false
export const selectLinks = createSelector([getLinksState],({links}) =>{ 
         

      const data = getUniqueLinks(links)
     
    return data.filter(link => link.hidden == false )} )

//selectHiddenLinks returns an array of links from the given links parameter that have a hidden field of true   
export const selectHiddenLinks = createSelector([getLinksState],({links}) => {
    
    const data = getUniqueLinks(links)
    return data.filter(link => link.hidden == true )} )

//selectSearchedLinks returns an array of links from the given searchedLinks parameter that have a hidden field of false
export const selectSearchedLinks = createSelector([getLinksState],({searchedLinks}) =>{ 

    const data = getUniqueLinks(searchedLinks)

    return data.filter(link => link.hidden == false )} )

//selectFilterLinks returns an array of links from the given filterLinks parameter that have a hidden field of false
export const selectFilterLinks = createSelector([getLinksState],({filterLinks}) =>{ 

        const data =  getUniqueLinks(filterLinks)

        return data.filter(link => link.hidden == false )} )

// selectUniqueCategory return an array of categories with unique id from given categories
export const selectUniqueCategory = createSelector([getCategoryState], ({categories}) => {

    const categoriesIDs = new Set (categories.map(item => item.id))


    return [...categoriesIDs].map(id => categories.find(category => category.id === id  ))
} )