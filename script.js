const apiKey='614417e898ba481084a1d5b370ea386c';
const blog_container = document.getElementById('container');
const searchbtn=document.getElementById("but");
searchbtn.addEventListener("click" , () =>{
    fetch_newsquery();
});
 
async function fetch_randomnews(){
    try{
        const apiurl=`https://newsapi.org/v2/top-headlines?country=us&pageSize=100&apikey=${apiKey}`;
        const response= await fetch(apiurl);
        const data=await response.json();
        console.log(data);
        return data.articles;
    }catch(e){
        console.log(e);
        return [];
    }
}
async function fetch_newsquery(){
   
    try{ 
        const inputstring=document.getElementById("search").value.trim();
        console.log(inputstring);
        const apiurl = `https://newsapi.org/v2/everything?q=${inputstring}&apikey=614417e898ba481084a1d5b370ea386c`;
        const response= await fetch(apiurl);
        const data=await response.json();
        console.log(data);
        displayBlog(data.articles);
    }catch(e){
        console.log(e);
        return [];
    }
}
function displayBlog(articles){
    blog_container.innerHTML="";
    articles.forEach((article)=>{
        
        const blogCard=document.createElement("div");
        blogCard.classList.add("blog-card");
        const img=document.createElement("img");
        img.src=article.urlToImage;
        img.alt=article.title;
        const title=document.createElement("h2");
        const trimtitle= article.title.length>30?
        article.title.slice(0,30)+"..." :article.title ;
        title.textContent=trimtitle;
        const details=document.createElement("p");
        details.textContent=article.description;
        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(details);
        blogCard.addEventListener("click", ()=>{
            window.open(article.url,"_blank_")
        });
        blog_container.appendChild(blogCard);
    })
}
(async()=>{
    try{
        const articles=await fetch_randomnews();
        displayBlog(articles);
    }catch(e){
        console.log(e);
    }
})();