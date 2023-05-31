import React, {useState, useRef, useEffect} from 'react';
import './card.css';
import Logo from './logo';

const Card = (props) => {
    const cardWrapperRef = useRef()
    const cardRef = useRef()
    const cardFrontInnerRef = useRef()
    const cardBackInnerRef = useRef()
    const cardGlareRef = useRef()
    const cardShadowRef = useRef()
    const cardImageRef = useRef()

    function CardImage(){
        if(props.img!==undefined){
            return <img ref={cardImageRef} src={props.img}/>
        }else{
            return <img ref={cardImageRef}/>
        }
        
    }

    function CardShadow(){
        return <div ref={cardShadowRef} className="cardShadow"></div>
    }  

    function CardGlare(){
        return <div ref={cardGlareRef} className='glare'></div>
    }  
    function CardFrontInner(){
        return <div ref={cardFrontInnerRef} className="frontface card-inner"><CardGlare></CardGlare><CardImage></CardImage></div>
    }
    function CardBackInner(){
        return <div ref={cardBackInnerRef}  className="backface card-inner"><Logo/></div>
    }  
    function Card(){

        let classList = "card"
        if(props.flipped==true){
            classList = "card flip"
        }else{
            classList = "card"
        }

        return <div ref={cardRef} className={classList}><CardFrontInner></CardFrontInner><CardBackInner></CardBackInner></div>
    }
    function CardWrapper(){

        const handleMouseEnter=(e)=>{
            let cardWrapperRefStyle = cardWrapperRef.current.style
            let cardRefStyle = cardRef.current.style
            let cardFrontInnerRefStyle = cardFrontInnerRef.current.style
            let cardBackInnerRefStyle = cardBackInnerRef.current.style
            let cardGlareRefStyle = cardGlareRef.current.style
            let cardShadowRefStyle = cardShadowRef.current.style
            let cardImageRefStyle = cardImageRef.current.style
            e.target.addEventListener("mouseleave", ()=>{
                cardWrapperRef.current.style = cardWrapperRefStyle.current
                cardRef.current.style = cardRefStyle.current
                cardFrontInnerRef.current.style = cardFrontInnerRefStyle.current
                cardBackInnerRef.current.style = cardBackInnerRefStyle.current
                cardGlareRef.current.style = cardGlareRefStyle.current
                cardShadowRef.current.style = cardShadowRefStyle.current
                cardImageRef.current.style = cardImageRefStyle.current
            },{once:true})
        }

        const handleMouseMove=(e)=>{
            if(props.touchable==true){
                let rect = cardWrapperRef.current.getBoundingClientRect()
                let x = (e.clientX - rect.left)/rect.width
                let y = (e.clientY - rect.top-25)/rect.height
            
                //animate light glare
                cardGlareRef.current.style.transform = `rotate(${(x*-180)}deg) translate(-50%, -50%)`;
                cardGlareRef.current.style.opacity = `${y*100}%`
            
                //aniamte movement
                let yAxis = (rect.top + (cardRef.current.offsetHeight / 2) - e.pageY) / -7.5;
                let xAxis = (rect.left + (cardRef.current.offsetWidth / 2) - e.pageX) / 15;
                cardRef.current.style.transform = 'rotateX('+ yAxis + 'deg) rotateY('+ xAxis + 'deg)';
            
                //animate depth
                cardRef.current.style.boxShadow = 
                `${x*10-5}px ${y*10-5}px 0px white`
            
                //animate shadow
                let xShadowOffset = (x*20-10)
                
                let yShadowSpread = (y*80-40)
                if(yShadowSpread<0){yShadowSpread = yShadowSpread*-1}
                if(yShadowSpread<8){yShadowSpread = 8}
                
                let yShadowOpacity = (e.clientY - rect.top)/(rect.height/2)*99
                if(yShadowOpacity>100){yShadowOpacity = (e.clientY - rect.bottom)/(rect.height/2)*-99}
                cardShadowRef.current.style.opacity = `${yShadowOpacity}`
                cardShadowRef.current.style.boxShadow = 
                    `${xShadowOffset}px ${yShadowSpread+40}px ${yShadowSpread+20}px ${yShadowSpread/40}px rgba(43,43,43, 1)`
                    cardShadowRef.current.style.transform = "translateY(50px)"
            }
        }

        return <div
            ref={cardWrapperRef}
            className="card-wrapper"
            onMouseMove={(e)=>handleMouseMove(e)}
            onMouseEnter={(e)=>handleMouseEnter(e)}
        ><Card/><CardShadow/></div>
    }

    useEffect((e)=>{
        if(props.flipOnRender[0]==true){
            if(cardRef.current.classList.contains("flip")){
                setTimeout((e)=>{
                    cardRef.current.classList.remove("flip")
                },props.flipOnRender[1]*(props.index+1))
            }else{
                setTimeout((e)=>{
                    cardRef.current.classList.add("flip")
                },props.flipOnRender[1]*(props.index+1))
            }
        }
    })
    
    return {render:(
        <CardWrapper></CardWrapper>
    )}
}

export default Card