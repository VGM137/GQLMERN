import React from "react";

const PostPagination = ({currentPage, setPage, postCount}) => {
  console.log(currentPage)
  
  let totalPages = 0
  const pagination = () => {
    totalPages = Math.ceil(postCount && postCount.totalPosts / 3)
    if(totalPages > 10) totalPages = 10 

    let pages = []
    for(let i = 1; i <= totalPages; i++){
      pages.push(i)
    }

    return (
      <>
        {pages.length &&
          pages.map((page, i) => (
            <li key={page} >
              <button className={`page-link ${currentPage === i+1 && 'active'}`} onClick={() => setPage(page)}>{page}</button>
            </li>
          ))
        }
      </>
    )
  }

  return (
    <nav>
      <ul className='pagination justify-content-center'>
        <li >
          <button className={`page-link ${currentPage === 1 && 'disabled'}`} onClick={() => setPage(currentPage-1)}>Previous</button>
        </li>
        {pagination()}
        <li >
          <button className={`page-link ${currentPage === totalPages && 'disabled'}`} onClick={() => setPage(currentPage+1)}>Next</button>
        </li>
      </ul>
    </nav>
  )
}

export default PostPagination;