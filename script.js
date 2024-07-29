document.addEventListener('DOMContentLoaded', function () {
  /** Loading Animation */
  function LoadingAnimation() {
    const counter3 = document.querySelector(".counter-3");
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 10; j++) {
        const div = document.createElement("div");
        div.className = "num";
        div.textContent = j;
        counter3.appendChild(div);
      }
    }
    const finalDiv = document.createElement("div");
    finalDiv.className = "num";
    finalDiv.textContent = "0";
    counter3.appendChild(finalDiv);

    function animate(counter, duration, delay = 0) {
      const numHeight = counter.querySelector(".num").clientHeight;
      const totalDistance =
        (counter.querySelectorAll(".num").length - 1) * numHeight;
      gsap.to(counter, {
        y: -totalDistance,
        duration: duration,
        delay: delay,
        ease: "power2.inOut",
      });
    }

    animate(counter3, 5);
    animate(document.querySelector(".counter-2"), 6);
    animate(document.querySelector(".counter-1"), 2, 4);

    gsap.to(".digit", {
      top: "-150px",
      stagger: {
        amount: 0.25,
      },
      delay: 6,
      duration: 1,
      ease: "power4.inOut",
    });

    gsap.from(".loader-1", {
      width: 0,
      duration: 6,
      ease: "power2.inOut",
    });

    gsap.from(".loader-2", {
      width: 0,
      delay: 1.9,
      duration: 2,
      ease: "power2.inOut",
    });

    gsap.to(".loader", {
      background: "none",
      delay: 6,
      duration: 0.1,
    });

    gsap.to(".loader-1", {
      rotate: 90,
      y: -50,
      duration: 0.5,
      delay: 6,
    });

    gsap.to(".loader-2", { x: -75, y: 75, duration: 0.5 }, "<");

    gsap.to(".loader", {
      scale: 40,
      duration: 1,
      delay: 7,
      ease: "power2.inOut",
    });

    gsap.to(".loader", {
      rotate: 45,
      y: 500,
      x: 2000,
      duration: 1,
      delay: 7,
      ease: "power2.inOut",
    });

    gsap.to(".loading-screen", {
      opacity: 0,
      duration: 0.5,
      delay: 7.5,
      ease: "power1.inOut",
    });
  }

  /** Loading First Load */
  function webStorage() {
    if (sessionStorage.getItem('visit')) {
      document.querySelector(".loading-screen").style.display = "none";
    } else {
      sessionStorage.setItem('visit', 'true');
      LoadingAnimation();
    }
  }
  webStorage();

  function initAnimation() {
    gsap.registerPlugin(ScrollTrigger);

    /** Sections Parallax Animation */
    function SectionPara() {
      const panels = gsap.utils.toArray(".parallax-item");
      const lastCard = document.querySelector(".parallax-item.last");

      panels.forEach((panel, i, sections) => {
        ScrollTrigger.create({
          trigger: panel,
          start: () => panel.offsetHeight < window.innerHeight ? "top top" : "bottom bottom",
          end:
            i === sections.length
              ? `+=${lastCard.offsetHeight / 2}`
              : lastCard.offsetTop,
          pin: true,
          pinSpacing: false,
          // markers: true,
        })
      })
    } SectionPara();

    /** Opacity ScrollTrigger */
    function OpacityScoll() {
      const heroH1 = document.querySelector(".hero h1");
      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "+=400vh",
        scrub: 1,
        onUpdate: (self) => {
          let opacityProgress = self.progress;
          heroH1.style.opacity = 1 - opacityProgress;
        }
      })

      const footH1 = document.querySelector(".foot h1");
      ScrollTrigger.create({
        trigger: ".foot",
        start: "top center",
        scrub: 1,
        // markers: true,
        onUpdate: (self) => {
          let opacityProgress = self.progress;
          footH1.style.opacity = 0 + opacityProgress;
        }
      })
    } 

    /** Marquee Section Animation */
    function Marquee() {
      function animateChars(chars, reverse = false) {
        const staggerOptions = {
          each: 0.35,
          from: reverse ? "start" : "end",
          ease: "linear",
        };

        gsap.fromTo(
          chars,
          { fontWeight: 100 },
          {
            fontWeight: 900,
            duration: 1,
            ease: "none",
            stagger: staggerOptions,
            scrollTrigger: {
              trigger: chars[0].closest(".marquee-container"),
              start: "50% bottom",
              end: "top top",
              scrub: true,
              // markers: true,
            },
          }
        );
      }

      new SplitType(".item h1", { types: "chars" });

      const marqueeContainers = document.querySelectorAll(".marquee-container");
      marqueeContainers.forEach((container, index) => {
        let start = "0%";
        let end = "-15%";

        if (index % 2 === 0) {
          start = "0%";
          end = "10%";
        }

        const marquee = container.querySelector(".marquee");
        const words = marquee.querySelectorAll(".item h1");

        gsap.fromTo(
          marquee,
          {
            x: start,
          },
          {
            x: end,
            scrollTrigger: {
              trigger: container,
              start: "top bottom",
              end: "150% top",
              scrub: true,
              // markers: true,
            },
          }
        );

        words.forEach((word) => {
          /** .item h1 의 쪼갠문자 */
          const chars = Array.from(word.querySelectorAll(".char"));
          if (chars.length) { //chars의 문자수
            const reverse = index % 2 !== 0; //짝수가 아닐때 reverse 에 저장
            animateChars(chars, reverse); // 함수 호출
          }
        });
      });
    } Marquee()

    /** Side Navigation Animation */
    function sideNav() {
      ScrollTrigger.create({
        start: "top -80",
        end: 99999,
        toggleClass: {
          className: "is-active",
          targets: "#parallax__nav"
        }
      });
      let links = gsap.utils.toArray("#parallax__nav ul li a");
      console.log(links)

      links.forEach(link => {
        let element = document.querySelector(link.getAttribute("href"));
        let linkST = ScrollTrigger.create({
          trigger: element,
          start: "top top"
        })

        ScrollTrigger.create({
          trigger: element,
          start: "top center",
          end: "bottom center",
          onToggle: self => setActvie(link) //true false
        })
        link.addEventListener("click", e => {
          e.preventDefault();
          gsap.to(window, { duration: 1, scrollTo: linkST.start, overwrite: "auto" })
        })
      })

      function setActvie(link) {
        links.forEach(el => el.classList.remove("active"));
        link.classList.add("active");
      }
    } sideNav()

    /** Background Color Change Animation */
    function bgColorChange() {
      gsap.utils.toArray(".backgroundChange").forEach((item) => {
        let color = item.getAttribute("data-bgcolor");

        ScrollTrigger.create({
          trigger: item,
          start: "top 50%",
          end: "bottom 50%",
          // markers: true,
          onEnter: () => gsap.to("body", {
            background: color,
            duration: 1.4,
          }),
          onEnterBack: () => gsap.to("body", {
            background: color,
            duration: 1.4,
          }),
        });
      })
    } bgColorChange()

    /** Lenis Scroll */
    function smoothScroll() {
      const lenis = new Lenis();
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 500));
      gsap.ticker.lagSmoothing(0);
    } smoothScroll()

    function mainNav() {
      let activeItemIndicator = CSSRulePlugin.getRule(".menu-item p#active::after");
      const toggleButton = document.querySelector(".burger");
      let isOpen = false;
      toggleButton.addEventListener("click", function () {
        if (isOpen) {
          timeline.reverse();
        } else {
          timeline.play();
        }
        isOpen = !isOpen;
      });
      gsap.set(".menu-item p", { y: 225 })
      const timeline = gsap.timeline({ paused: true });

      timeline.to(".navi-overlay", {
        duration: 1.5,
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "power4.inOut"
      });
      timeline.to(".menu-item p", {
        duration: 1.5,
        y: 0,
        stagger: 0.2,
        ease: "power4.out"
      }, "-=1");
      timeline.to(activeItemIndicator, {
        width: "100%",
        duration: 1,
        ease: "power4.out",
        delay: 0.5
      }, "<");
      timeline.to(".navi-overlay__sub", {
        bottom: "10%",
        opacity: 1,
        duration: 0.5,
        delay: 0.5
      }, "<");
    }
    mainNav()

    function HorizontalAnimation() {
      const horizontalContainer = document.querySelector('#parallax-horizontal');
      const horizontalItems = gsap.utils.toArray('#parallax-horizontal > section');
      const horizontalText = gsap.utils.toArray('#parallax-horizontal > section h2')
      
      let scrollTween =  gsap.to(horizontalItems, {
        xPercent: -100 * (horizontalItems.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: horizontalContainer,
          start: 'top top',
          end: () => "+=" + (horizontalContainer.offsetWidth - innerWidth),
          pin: true,
          scrub: 1,
          snap: {
            snapTo: 1 / (horizontalItems.length - 1),
            inertia: false,
            duration: {min: 0.1, max: 0.1}
          },
          invalidateOnrefresh : true,
          anticipatePin: 1,
        }
      })
      gsap.from(".img1", {
        y: -200,
        duration: 2,
        scrollTrigger: {
          trigger: ".img1",
          containerAnimation: scrollTween,
          start: "left center",
          toggleActions: "play none reverse none",
          markers: false,
          id: "img1"
        }
      });
      horizontalText.forEach(item => {
        ScrollTrigger.create({
          trigger: item,
          containerAnimation: scrollTween,
          start: "left center",
          toggleActions: "play none reverse none",
          scrub: true,
          onEnter: () => {animate(item)}
        })
      })
      const animate = item => {
        gsap.to(item, {
          y: 200,
          duration: 2,
        })
      }
    } 

    let path = location.pathname;
    if (path == '/gsap_02/index.html') {
      HorizontalAnimation();
    }
  } 
  initAnimation()

  function delay(n) {
    n = n || 2000;
    return new Promise((done) => {
      setTimeout(() => {
        done();
      }, n);
    });
  }

  function pageTransition() {
    const transitionItem = document.querySelectorAll('.common-transition .item');
    const transitionContainer = document.querySelector('.common-transition');
    const tl = gsap.timeline();
    tl.to(transitionItem, {
      duration: 1,
      scaleY: 1,
      transformOrigin: 'bottom left',
      stagger: 0.1,
      ease: 'Expo.easeInOut'
    });
    tl.to(transitionContainer, {
      duration: 1,
      y: '-100%',
      ease: 'Expo.easeInOut'
    });
    tl.to(transitionContainer, {
      duration: 0,
      y: 0
    });
    tl.to(transitionItem, {
      duration: 0,
      scaleY: 0,
      scaleX: 1
    });
  }

  function leaveAnimation() {
    const tl = gsap.timeline();
    tl.to("header", {
      // duration: 1,
      opacity: 0,
      y: -150,
    });
    tl.to('.hero h1', {
      duration: 1,
      y: -150,
      scale: 0,
      // opacity: 0,
    });
  }
  
  function leaveAfterAnimation() {
    const tl = gsap.timeline();

    tl.to(".navi-overlay", {
      duration: 0.5,
      clipPath: "polygon(0 0 , 100% 0 , 100% 0 , 0 0)",
    });
  }

  function enterAnimation() {
    const tl = gsap.timeline();
    
    tl.from('.hero h1', {
      duration: 1,
      y: 150,
      // opacity: 0,
      scale: 0,
    })
    tl.from("header", {
      duration: 1,
      y: -150,
      // opacity: 0,
    });
  }

  // barba設定
  barba.init({
    sync: true,
    transitions: [
      {
        async leave(data) {
          const done = this.async();
          leaveAnimation();
          pageTransition();
          await delay(1000);
          done();
        },
        async beforeEnter(data) {
          leaveAfterAnimation();
        },
        async enter(data) {
          await delay(1000);
          enterAnimation();
        },
        async after(data) {
          initAnimation();
          window.scrollTo(0, 0);
        }
      }
    ],
  });

})