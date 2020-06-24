import React from "react"
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import SimpleReactLightbox from 'simple-react-lightbox'
import { SRLWrapper } from 'simple-react-lightbox'
import { FaKiss } from "react-icons/fa";


function TimelineElement({ myMapData }) {

  return (
    <>
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        // contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
        // contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
        // date="2011 - present"
        iconStyle={{ background: '#688e67', color: '#fff' }}
        icon={<FaKiss />}
      >
        <h5 className="vertical-timeline-element-title" style={{ fontWeight: "bold" }}>{myMapData.date.substring(0, 10)}</h5>
        <div>
          <SimpleReactLightbox>
            <SRLWrapper>
              <div className="mymapBgImg"><img className="object-fit" src="https://i.pinimg.com/236x/45/52/69/455269f74db2f927eb782313bca81127.jpg" alt="Caption" /></div>
              <div className="d-flex">
                <div className="mymapSmImg"><img src="https://i.pinimg.com/236x/23/19/7f/23197ffffcf105ff694f7e5fa407fad3.jpg" alt="Another Caption" /></div>
                <div className="mymapSmImg"><img src="https://i.pinimg.com/236x/e7/2d/44/e72d44bc5ff7f327a02739f093b55d87.jpg" alt="Final Caption" /></div>
                <div className="mymapSmImg"><img src="https://i.pinimg.com/236x/e7/2d/44/e72d44bc5ff7f327a02739f093b55d87.jpg" alt="Final Caption" /></div>
              </div>
            </SRLWrapper>
          </SimpleReactLightbox>
        </div>
        <p className="vertical-timeline-element-subtitle">{myMapData.productName}</p>
        {/* <p>
                            Creative Direction, User Experience, Visual Design, Project Management, Team Leading
    </p> */}
      </VerticalTimelineElement>
    </>
  )
}

export default TimelineElement