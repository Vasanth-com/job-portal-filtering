import { useState } from 'react'
import './App.css'
import Filter from './components/Filter'
import Footer from './components/Footer'
import Header from './components/Header'
import JobPosts from './components/JobPosts'
import jobPost from './assets/jobdata'

function App() {
  const [searchTerms,setSearchTerms] = useState([]);
  const [showFilter,enableFilter] = useState(false);

  const onClick = (e) =>{
    const textContent = e.target.textContent;
    
    if(!searchTerms.includes(textContent)){
      setSearchTerms([...searchTerms , textContent])
      enableFilter(true);
    }
  }
  
  const clear = (e) =>{
    const className  = e.target.className;
    const textContent = e.target.textContent;
    const previousElementSibling = e.target.previousElementSibling;
    
      if(className === 'clear'){
        setSearchTerms('');
      } else if(className === "term" ){
          setSearchTerms(searchTerms.filter(term => term !== textContent))
      }else {
        setSearchTerms(searchTerms.filter(term => term !== previousElementSibling.textContent))
      }
      console.log(searchTerms.length);
      if(searchTerms.length <= 1){
        enableFilter(false);
      }
      
  }

  const checkCriteria = (data) => {
      return searchTerms.every(term => {
        return data.skills.includes(term)
      })
  }



  const createPost = (post) =>(
    <JobPosts
      key={post.id}
      onClick = {onClick}
      companyName = {post.companyName}
      jobTitle = {post.jobTitle}
      companyLogo = {post.companyLogo}
      skills = {post.skills}
      new = {post.new}
      featured = {post.featured}
      dayOfPost = {post.dayOfPost}
      contract = {post.contract}
      region = {post.region}
    />
  )
  return (
    <div className='app'>
    <Header/>
    <Filter
      terms = {searchTerms} onClick = {clear} visible = {showFilter}
    />
    {
      searchTerms.length > 0 ? jobPost.filter(checkCriteria).map(createPost) : jobPost.map(createPost)
    }
    <Footer/>
    </div>
  )
}

export default App
