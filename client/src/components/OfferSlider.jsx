import "../styles/offers.css";

const SINGLE_OFFERS = [
{ buy:10, free:15 },
{ buy:6, free:9 },
{ buy:5, free:5 },
{ buy:4, free:3 },
{ buy:3, free:2 }
];

const SET_OFFERS = [
{ buy:5, free:10 },
{ buy:4, free:6 },
{ buy:3, free:2 },
{ buy:2, free:1 }
];

export default function OfferSlider(){

const offers = [

...SINGLE_OFFERS.map(o=>`Buy ${o.buy} Posters Get ${o.free} Free`),

...SET_OFFERS.map(o=>`Buy ${o.buy} Sets Get ${o.free} Free`)

];

/* duplicate for infinite loop */

const loopOffers=[...offers,...offers,...offers];

return(

<section className="offer-slider">

<div className="offer-track">

{loopOffers.map((o,i)=>(
<span key={i} className="offer-item">
{o}
</span>
))}

</div>

</section>

)

}