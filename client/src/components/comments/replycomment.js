import React, { useState } from 'react'
import '../../styles/mContent/userComment.scss'
import RatingStar from './ratingStar'
import { BsPlusCircle } from 'react-icons/bs'
import { IconContext } from 'react-icons'

//確認框
import Swal from 'sweetalert2'

function ReplyComment({ commentData }) {
  //state
  const [image, setImage] = useState({ file: [], preview: [], raw: '' })
  const [text, setText] = useState('')
  const [list, setList] = useState([])
  const [ratingValue, setRatingValue] = useState('')


//評論送出
// const commentData ={
//   commentMemberId:"",
//   comment:[]
// }

// const sendCommentAsync = async (comment) => {
//   const request = new Request('http://localhost:5000/sendComments/2', {
//     method: 'post',
//     body: JSON.stringify(comment),
//     headers: new Headers({
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     }),
//   })
//   const response = await fetch(request)
//   const data = await response.json()
//   const orderId = {...buyerinfo}
//   orderId.orderId = data
//   props.dispatch({ type: 'BUYER_DATA', value: orderId })
// }


  // 上傳圖片
  let fileObj = []
  let fileArray = []

  const handleChange = (e) => {
    console.log("test")
    fileObj.push(e.target.files)
    console.log(fileObj)
    console.log("test")
    for (let i = 0; i < fileObj[0].length; i++) {
      fileArray.push(URL.createObjectURL(fileObj[0][i]))
      console.log(fileObj)
      console.log(fileArray)
    }
    // setImage({ file: fileArray })
    if (e.target.files.length) {
      setImage({
        preview: fileArray,
        raw: e.target.files[0],
      })
    }
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('image', image.raw)

    await fetch('YOUR_URL', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    })
  }

  const handleTextChange = (e) => {
    setText(e.target.value)
    console.log('test')
    console.log(text)
  }

  const handleSubmit = (e, index) => {
    // alert('submit')
    text !== ''
      ? Swal.fire({
        text: '成功送出評論',
        icon: 'success',
        confirmButtonText: '確定',
        confirmButtonColor: 'rgba(104, 142, 103, 0.8)',
      }) && handleDelete(index) 
      // && sendCommentAsync(commentData)
      : Swal.fire({
        text: '評論不能為空白',
        icon: 'warning',
        confirmButtonText: '確定',
        confirmButtonColor: 'rgba(104, 142, 103, 0.8)',
      })

    e.preventDefault()
  }

  const handleDelete = (index) => {
    const newList = [...list]
    newList.splice(index, 1)
    setList(newList)
  }

  //子元素回傳星等
  const getRatingValue = (value) => {
    setRatingValue(value)
    console.log(ratingValue + 1)
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        method="POST"
        action="/{commentData.memberId}"
        enctype="multipart/form-data"
        key={commentData.orderId}
      >
        <div className="reply-listview">
          <div className="comment-tbhead">
            <div class="row">
              <div class="col-9 pl-1"><h5 className="eventTitle " style={{ fontWeight: "bold" }}>{commentData.productName}</h5></div>
              <div class="col-3 pr-1">
                <ul className="float-right list-unstyled" >
                  <li><small>訂單編號:{commentData.orderId}</small></li>
                  <li><small>活動日期:{commentData.date.substring(0, 10)}</small></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="row">
            <div className="mynotReplyBox d-flex">
              <div className="eventImgBox col-3">
                <img
                  src="https://i.pinimg.com/564x/6e/61/7c/6e617c62730ff732340ea3bf1fbef940.jpg"
                  alt=""
                />
              </div>
              <div className=" col-9 pl-3">
                <ul className=" list-unstyled">
                  {/* <li className="d-flex">
                    <p>活動日期:{commentData.date}</p>
                  </li> */}
                  <li className="d-flex">
                    <p style={{fontWeight:"bold"}}>輸入星等:</p>
                    <RatingStar getRatingValue={getRatingValue} />
                  </li>
                  <li className="d-flex">
                    <p style={{fontWeight:"bold"}}>上傳相片:</p>
                    <div className="d-flex">
                      {image.preview.length > 0
                        ? image.preview.map((item) => {
                          return (
                            <>
                              <div className="commentImg">
                                <img
                                  className="commentImgPhoto"
                                  src={item}
                                  alt=""
                                />
                              </div>
                            </>
                          )
                        })
                        : ''}

                      {image.preview.length >= 3 ? (
                        ''
                      ) : (
                          <>
                            <label htmlFor={commentData.orderId}>
                              <div className="commentImgPlus">
                                <IconContext.Provider
                                  value={{
                                    color: 'rgba(104, 142, 103, 0.8)',
                                    size: '40px',
                                  }}
                                >
                                  <BsPlusCircle />
                                </IconContext.Provider>
                              </div>
                            </label>

                            <input
                              type="file"
                              id={commentData.orderId}
                              style={{ display: 'none' }}
                              onChange={handleChange}
                              // ref={divRef}
                              multiple
                            // value={text}
                            />
                          </>
                        )}
                    </div>
                  </li>
                  <li>
                    <p style={{fontWeight:"bold"}}  >輸入評論:</p>
                    <textarea
                      className="form-control"
                      // id={commentData.orderId}
                      rows="6"
                      onChange={(index) => handleTextChange(index)}
                    //  key={index}
                    ></textarea>
                  </li>
                </ul>
                <button
                  className="btn buttonstyle float-right mt-3"
                  type="submit"
                  // id={commentData.orderId}
                  value="Submit"
                // onClick={()=>handleDelete(index)}
                // onClick={handleUpload}
                // onClick={()=>{setAccount("")}}
                >
                  提交評論
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default ReplyComment
