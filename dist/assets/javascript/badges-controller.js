!function(){const e=document.querySelectorAll(".js-badge");document.querySelectorAll(".js-badged-container-controlled");let t=document.querySelector(".js-badge.badges-list__item--active");console.log({activeBadge:t});let a=t?.dataset.containerId,d=document.querySelector(`.js-badged-container-controlled[data-id="${a}"]`);d?.classList.remove("d-none");const c=e=>{e.target!==t&&(t?.classList.remove("badges-list__item--active"),a=e.target.dataset.containerId,t=e.target,t.classList.add("badges-list__item--active"),d?.classList.add("d-none"),d=document.querySelector(`.js-badged-container-controlled[data-id="${a}"]`),d?.classList.remove("d-none"))};e.forEach((e=>{e.addEventListener("click",c)}))}();