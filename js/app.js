//add event for the document while loaded
document.addEventListener("DOMContentLoaded", function(event) {   

    //select unordered list
    const uls=document.getElementById("ulist");
    //creating the fragment for append all <li> once
    const fragment=document.createDocumentFragment();
    //select the sections for dynamically building the navigation menu
    var allSections=document.querySelectorAll('section');

    //loop for all the sections and build the items menu 
   allSections.forEach( (section)=>{
        //get the data-nav attribute for each section to append it with the link
        const section_dnave = section.getAttribute('data-nav');
        //create <a> element
        const nlink=document.createElement('a');
        //append data-nave attribute to the link
        nlink.appendChild(document.createTextNode(section_dnave));
        //create the <li>
        const nli= document.createElement('li');
        //add event to the <li> while click suppose to reach the exact section 'smooth' behavior
        nli.addEventListener('click', ()=>{
            section.scrollIntoView({behavior:"smooth"});
        });
        //append the <a> to <li>
        nli.appendChild(nlink);
        //append <li> to the fragment
        fragment.appendChild(nli);
    });
    //push all <li> from the fragment to the unordered list
    uls.appendChild(fragment);
    //add scroll event to the window
    window.addEventListener('scroll',scrolEventListener,false);

    //selecting the button back to top then adding Click event on it
    const btn=document.getElementById('button');
    btn.addEventListener('click',buttonEventListener,false);
    // selecting all <li> links  
    const allLinks = document.querySelectorAll('a');
    var scrollTimer = -1;
    /*
    below scroll Event function for checking which section is in the viewport 
    by calculating the getBoundingClientRect()
    according to this we can change the background for each sction active beside its matched menu
    */
    function scrolEventListener(){  
       if(document.scrollingElement.scrollTop === 0){
        btn.classList.remove('show');  
       }        
        allSections.forEach( (sec)=>{
            const rct = sec.getBoundingClientRect();
            
            if(rct.top >= -100 && rct.top <= 200){               
                allSections.forEach( (rem)=> {
                    rem.style.background = "";               
                });
                sec.style.background = "#337ab7";
               
                allLinks.forEach((l)=>{
                    if(l.id !=='button'){
                        l.style.background="#337ab7";
                    }
                });
                allLinks.forEach((alink)=>{
                    if(sec.getAttribute('data-nav')==alink.textContent){
                        alink.style.background = "blue";
                    }
                });    

                // show btn Back to top while scrolling 
                btn.classList.add('show');
            }
        }); 
    }

    // below event responsible for showing the navigation menu while scrolling 
    // and hidding it while not scrolling
    window.addEventListener('scroll', function() {
        uls.style.visibility='visible';
        if (scrollTimer != -1){
            clearTimeout(scrollTimer);
        }
        scrollTimer = setTimeout(function() {
            uls.style.visibility='hidden';
        }, 150);
    }, false);
    
    /**
     * below event for the click button to reach begin of the landing page
     * and change the active section & navigation menu
     */
    function buttonEventListener(){
        document.scrollingElement.scrollTop = 0
        allSections.forEach( (rem)=> {
            rem.style.removeProperty('background');
        });
        allLinks.forEach((l)=>{
            if(l.id !=='button'){
                l.style.background="#337ab7";
            }
        });
        btn.classList.remove('show');    
    }
    
});



