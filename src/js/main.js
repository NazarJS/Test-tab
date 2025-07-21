  let currentActiveButton = null;

  function selectTab(type, button, subRatingId){
    currentActiveButton != null ? currentActiveButton.classList.remove('bk-rating__tab--active') : false;
    button.classList.add('bk-rating__tab--active');
    currentActiveButton = button;
    const list = document.getElementById('list');
    list.innerHTML = '';
    loadData(type, subRatingId);
  }

  async function loadData(type, subRatingId){
      try{
          showLoader(true);
          const DATA = await fetchTopBk(type, subRatingId);
          randerItems(DATA);
      }catch(error){
        console.log(error);
      }finally{
        showLoader(false);
      }
  }

  function fetchTopBk(type, subRatingId){
    return new Promise((resolve)=>{
      setTimeout(()=>{
        let sortedData = [...jsonData];
        switch(type){
          case 'byuser': 
           sortedData = sortedData.sort((a, b)=>b.review_count - a.review_count)
           console.log(type);
           break;

          case 'byeditors': 
            sortedData = sortedData.sort((a, b)=>b.rating - a.rating)
            console.log(type);
            break;

          case 'bybonus': 
            sortedData = sortedData.sort((a, b)=> b.bonus_amount - a.bonus_amount)
            console.log(type);
            break;

          case 'bysubrating': 
            switch(subRatingId){
              case 'reliability':
                sortedData = sortedData.sort((a, b)=>b.id - a.id)
                break;

              case 'speed':
                sortedData = sortedData.sort((a, b)=>a.id - b.id)
                break;

              default :
                sortedData = sortedData.sort((a, b)=>a.id - b.id)
                break;
            }
            break;

           default:
            break;
        }
        resolve(sortedData);    
      },1000)
    })
  } 

  function randerItems(items){
    const list = document.getElementById('list');
    items.forEach((item)=> {
      const block = document.createElement('div');
      block.className = 'bk-rating__item';
      block.innerHTML = `<div class = "bk-rating__wrap">
      <div class="bk-rating__img">
                    <img class="bk-rating__image" src="${item.logo}" alt="bk">
                    <div class="bk-rating__circule">
                        <div class="bk-rating__status">
                            <img src="./images/svg/ok.svg" alt="ok">
                        </div>
                    </div>
                </div>

                <div class="bk-rating__stat">
                    <div class="bk-rating__stars">
                        ${getRating(item.rating)}
                    </div>
                    <div class="bk-rating__number">${item.rating}</div>
                </div></div>

                <div class="bk-rating-comments">
                    <img class="bk-rating-comments__icon" src="./images/svg/comments.svg" alt="comments">
                    <div class="bk-rating-comments__number">
                        ${item.review_count}
                    </div>
                </div>

                <div class="bk-rating-price">
                    <div class="bk-rating__bage bk-rating__bage--${item.badge}">
                        ${getBadgeTitle(item.badge)}
                    </div>
                    ${isBonusAmount(item.bonus_amount)}
                </div>

                <div class="bk-rating__buttons">
                    <a href="${item.internal_link}" class="bk-rating__button ui-btn ui-btn--internal">
                        ОБЗОР
                    </a>
                    <a href="${item.external_link}" class="bk-rating__button ui-btn ui-btn--external">
                        САЙТ
                    </a>
                </div>`;
                
      list.appendChild(block);
    })
  }

  window.onload = () =>{
    const firstButton = document.querySelector('.bk-rating__tab');
    selectTab('byuser', firstButton);
  }

  function isBonusAmount(bonusAmount){
    if(bonusAmount == 0 ){
      return '';
    } else {
      return `<div class="bk-rating-price__wrap">
                        <img class="bk-rating-price__icon" src="./images/svg/gift.svg" alt="icon">
                        <div class="bk-rating-price__number">
                            ${bonusAmount}K ₽
                        </div>
                    </div>`;
    }
  }

  function getBadgeTitle(badge){
    switch(badge){
      case 'exclusive':
        return 'Эксклюзив'
        break;

      case 'no-deposit':
        return 'Без депозита'
        break;

      case 'no-bonus':
        return 'Нет бонуса'
        break;

      default: 
        return '';
        break;
    }
  }

  function showLoader(show){
    const loader = document.getElementById('loader')
    loader.style.display = show ? 'flex' : 'none';
  }

  function getRating(rating) {
      const filledStar = `
      <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.68335 2.43381C7.71257 2.37478 7.7577 2.3251 7.81366 2.29036C7.86961 2.25562 7.93416 2.23721 8.00002 2.23721C8.06588 2.23721 8.13043 2.25562 8.18639 2.29036C8.24234 2.3251 8.28747 2.37478 8.31669 2.43381L9.85669 5.55314C9.95814 5.75845 10.1079 5.93608 10.2931 6.07078C10.4783 6.20547 10.6934 6.29322 10.92 6.32648L14.364 6.83048C14.4293 6.83993 14.4906 6.86746 14.541 6.90994C14.5914 6.95243 14.629 7.00817 14.6494 7.07088C14.6698 7.13359 14.6722 7.20075 14.6564 7.26477C14.6406 7.32879 14.6072 7.38711 14.56 7.43314L12.0694 9.85848C11.9051 10.0185 11.7822 10.2161 11.7112 10.4342C11.6403 10.6523 11.6234 10.8844 11.662 11.1105L12.25 14.5371C12.2615 14.6024 12.2545 14.6695 12.2297 14.7309C12.2049 14.7923 12.1633 14.8455 12.1097 14.8845C12.0561 14.9234 11.9927 14.9465 11.9266 14.9511C11.8605 14.9557 11.7945 14.9416 11.736 14.9105L8.65735 13.2918C8.4545 13.1853 8.22881 13.1296 7.99969 13.1296C7.77057 13.1296 7.54488 13.1853 7.34202 13.2918L4.26402 14.9105C4.20557 14.9414 4.13962 14.9553 4.07365 14.9506C4.00769 14.946 3.94437 14.9229 3.89088 14.884C3.8374 14.8451 3.79591 14.7919 3.77112 14.7306C3.74634 14.6693 3.73926 14.6023 3.75069 14.5371L4.33802 11.1111C4.37682 10.885 4.36001 10.6527 4.28905 10.4345C4.21808 10.2163 4.09509 10.0186 3.93069 9.85848L1.44002 7.43381C1.39242 7.38783 1.35868 7.32941 1.34266 7.26519C1.32664 7.20098 1.32898 7.13355 1.34941 7.0706C1.36983 7.00765 1.40753 6.9517 1.4582 6.90913C1.50888 6.86656 1.57049 6.83907 1.63602 6.82981L5.07935 6.32648C5.30619 6.29348 5.52161 6.20585 5.70708 6.07113C5.89254 5.93642 6.04249 5.75866 6.14402 5.55314L7.68335 2.43381Z" fill="#F3BB44" stroke="#F3BB44" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`;

      const emptyStar = `
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.68334 1.53C7.71255 1.47097 7.75769 1.42129 7.81364 1.38655C7.86959 1.35181 7.93414 1.3334 8.00001 1.3334C8.06587 1.3334 8.13042 1.35181 8.18637 1.38655C8.24232 1.42129 8.28746 1.47097 8.31667 1.53L9.85667 4.64933C9.95812 4.85465 10.1079 5.03227 10.2931 5.16697C10.4783 5.30167 10.6934 5.38941 10.92 5.42267L14.364 5.92667C14.4293 5.93612 14.4906 5.96365 14.541 6.00613C14.5914 6.04862 14.629 6.10437 14.6494 6.16707C14.6697 6.22978 14.6722 6.29694 14.6564 6.36096C14.6406 6.42498 14.6072 6.4833 14.56 6.52933L12.0693 8.95467C11.9051 9.11474 11.7822 9.31232 11.7112 9.53042C11.6403 9.74852 11.6234 9.98059 11.662 10.2067L12.25 13.6333C12.2615 13.6986 12.2545 13.7657 12.2297 13.8271C12.2049 13.8885 12.1633 13.9417 12.1097 13.9807C12.0561 14.0196 11.9927 14.0427 11.9266 14.0473C11.8605 14.0519 11.7945 14.0378 11.736 14.0067L8.65734 12.388C8.45448 12.2815 8.22879 12.2258 7.99967 12.2258C7.77055 12.2258 7.54486 12.2815 7.342 12.388L4.264 14.0067C4.20556 14.0376 4.1396 14.0515 4.07364 14.0468C4.00767 14.0421 3.94435 14.019 3.89087 13.9801C3.83739 13.9412 3.79589 13.8881 3.77111 13.8268C3.74632 13.7655 3.73924 13.6985 3.75067 13.6333L4.338 10.2073C4.3768 9.98116 4.35999 9.74893 4.28903 9.5307C4.21807 9.31246 4.09508 9.11477 3.93067 8.95467L1.44 6.53C1.3924 6.48402 1.35867 6.4256 1.34265 6.36138C1.32663 6.29717 1.32896 6.22975 1.34939 6.16679C1.36982 6.10384 1.40752 6.04789 1.45819 6.00532C1.50886 5.96275 1.57047 5.93527 1.636 5.926L5.07934 5.42267C5.30618 5.38967 5.5216 5.30204 5.70706 5.16733C5.89252 5.03261 6.04247 4.85485 6.144 4.64933L7.68334 1.53Z" fill="#F6F6F6" stroke="#F6F6F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`;

      let starsCount = 0;
      if (rating >= 4.6) starsCount = 5;
      else if (rating >= 4.0) starsCount = 4;
      else if (rating >= 3.0) starsCount = 3;
      else if (rating >= 2.0) starsCount = 2;
      else if (rating >= 1.0) starsCount = 1;
      else starsCount = 0;

      let starsHTML = '';
      for (let i = 0; i < 5; i++) {
          starsHTML += i < starsCount ? filledStar : emptyStar;
      }

      return `<div class="bk-rating__stars">${starsHTML}</div>`;
  }



   let jsonData = [
  {
    "id": 1,
    "logo": "../src/images/1x.png",
    "rating": 4.7,
    "review_count": 123,
    "bonus_amount": 100,
    "badge": "exclusive",
    "internal_link": "/bk/1",
    "external_link": "https://partner1.com"
  },
  {
    "id": 2,
    "logo": "../src/images/onbet.png",
    "rating": 4.2,
    "review_count": 87,
    "bonus_amount": 135,
    "badge": "no-deposit",
    "internal_link": "/bk/2",
    "external_link": "https://partner2.com"
  },
  {
    "id": 3,
    "logo": "../src/images/leon.png",
    "rating": 3.9,
    "review_count": 45,
    "bonus_amount": 0,
    "badge": "no-deposit",
    "internal_link": "/bk/3",
    "external_link": "https://partner3.com"
  },
  {
    "id": 4,
    "logo": "../src/images/win.png",
    "rating": 2.1,
    "review_count": 405,
    "bonus_amount": 777,
    "badge": "no-bonus",
    "internal_link": "/bk/3",
    "external_link": "https://partner3.com"
  },
  {
    "id": 5,
    "logo": "../src/images/mel.png",
    "rating": 2.7,
    "review_count": 405,
    "bonus_amount": 777,
    "badge": "no-bonus",
    "internal_link": "/bk/3",
    "external_link": "https://partner3.com"
  },
  {
    "id": 6,
    "logo": "../src/images/1x.png",
    "rating": 2.5,
    "review_count": 5,
    "bonus_amount": 77,
    "badge": "no-deposit",
    "internal_link": "/bk/3",
    "external_link": "https://partner3.com"
  },
  {
    "id": 7,
    "logo": "../src/images/onbet.png",
    "rating": 3.4,
    "review_count": 415,
    "bonus_amount": 77,
    "badge": "exclusive",
    "internal_link": "/bk/3",
    "external_link": "https://partner3.com"
  }
]  
  


