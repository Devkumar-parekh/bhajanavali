import React, { useEffect, useState, useRef } from "react";
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  const [videoId, setVideoId] = useState("e1QcvHjosfE");
  const videosRef = useRef([]);
  const playerRef = useRef(null);

  const getResponsivePlayerSize = () => {
    const maxWidth = 315;
    const maxHeight = 560;
    const width = Math.min(window.innerWidth - 24, maxWidth);
    const height = Math.round((width / maxWidth) * maxHeight);
    return { width: Math.max(width, 180), height: Math.max(height, 180) };
  };

  useEffect(() => {
    let mounted = true;
    async function loadList() {
      const DEFAULT_VIDEOS = ["e1QcvHjosfE"];
      let fileIds = [];
      try {
        const res = await fetch("/videos.json", { cache: "no-cache" });
        if (res.ok) {
          const data = await res.json();
          fileIds = (Array.isArray(data) ? data : [])
            .map((v) => (typeof v === "string" ? v : v.id))
            .filter(Boolean);
        }
      } catch (e) {}

      const env = process.env.REACT_APP_VIDEOS || "";
      const envIds = env ? env.split(",").map((s) => s.trim()).filter(Boolean) : [];

      // Prefer explicit env var list if provided; otherwise use file list; otherwise default
      const chosen = envIds.length ? envIds : (fileIds.length ? fileIds : DEFAULT_VIDEOS);
      videosRef.current = chosen;
      const pick = chosen[Math.floor(Math.random() * chosen.length)];
      console.info("[Layout] chosen video list:", chosen);
      console.info("[Layout] initial pick:", pick);
      if (mounted) setVideoId(pick);
    }
    loadList();
    return () => {
      mounted = false;
    };
  }, []);

  // load YouTube IFrame API once and manage player to avoid showing related videos
  useEffect(() => {
    if (!videoId) return;

    let mounted = true;

    function loadYouTubeApi() {
      return new Promise((resolve) => {
        if (window.YT && window.YT.Player) return resolve(window.YT);
        const existing = document.getElementById("youtube-iframe-api");
        if (existing) {
          // wait until API ready
          const check = () => {
            if (window.YT && window.YT.Player) return resolve(window.YT);
            setTimeout(check, 50);
          };
          check();
          return;
        }
        const tag = document.createElement("script");
        tag.id = "youtube-iframe-api";
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
        window.onYouTubeIframeAPIReady = () => resolve(window.YT);
      });
    }

    let player;

    const onPlayerStateChange = (event) => {
      // 0 === ended
      if (event.data === window.YT.PlayerState.ENDED) {
        const ids = videosRef.current || [];
        if (!ids.length) return;
        // pick a new random id (allow repeat if only one)
        let next = ids[Math.floor(Math.random() * ids.length)];
        if (ids.length > 1) {
          // avoid repeating the same id
          const tries = 5;
          let i = 0;
          while (next === videoId && i < tries) {
            next = ids[Math.floor(Math.random() * ids.length)];
            i++;
          }
        }
        console.info("[Layout] video ended, next pick:", next, "from list", ids);
        if (!mounted) return;
        setVideoId(next);
      }
    };

    let destroyed = false;
    const updatePlayerSize = () => {
      if (!playerRef.current) return;
      const { width, height } = getResponsivePlayerSize();
      try {
        playerRef.current.setSize(width, height);
      } catch (e) {}
    };

    loadYouTubeApi().then((YT) => {
      if (destroyed) return;
      const { width, height } = getResponsivePlayerSize();

      // if player exists, instruct it to load the new video
      if (playerRef.current) {
        try {
          playerRef.current.loadVideoById(videoId);
          updatePlayerSize();
        } catch (e) {
          // fallback: recreate player
          playerRef.current.destroy();
          playerRef.current = null;
        }
      }

      if (!playerRef.current) {
        player = new YT.Player("yt-player", {
          height,
          width,
          videoId,
          playerVars: {
            rel: 0,
            modestbranding: 1,
            iv_load_policy: 3,
            origin: window.location.origin,
            // enablejsapi must be set on iframe src by API itself
          },
          events: {
            onStateChange: onPlayerStateChange,
          },
        });
        playerRef.current = player;
        updatePlayerSize();
      }
    });

    window.addEventListener("resize", updatePlayerSize);

    return () => {
      mounted = false;
      destroyed = true;
      window.removeEventListener("resize", updatePlayerSize);
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch (e) {}
        playerRef.current = null;
      }
    };
  }, [videoId]);
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img
              src="/logo.png"
              style={{ width: "100px" }}
              className="img-fluid"
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 flex-wrap">
              <li className="nav-item">
                <Link className="nav-link " aria-current="page" to="/">
                  જય સ્વામિનારાયણ
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/JayDevi">
                  जय देवी जय देवी
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/rambhajan">
                  શ્રી રામચંદ્ર કૃપાલુ ભજમન
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Sthalsthal">
                  સ્થળ સ્થળ મહીં
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Vishvambhari">
                  વિશ્વંભરી સ્તુતિ
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Gayatrichalisa">
                  मां गायत्री चालीसा
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Dattbavni">
                  દત્ત બાવની
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Barjyotirling">
                  દ્વાદશજ્યોતિર્લિઙ્ગસ્મરણમ
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Adhayshakti">
                  જય આદ્યાશક્તિ
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Chhand">
                  માતાજીના છંદ - અમીચંદ
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/TaliNiAarti">
                  श्री खंडोबा महाराज तळी आरती
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Chakrapuja">
                  चक्रपूजा
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container py-3 fs-4" style={{ background: "#f3d6d7" }}>
        <Outlet />
        <div className="d-flex justify-content-center align-items-center mt-5 w-100">
          <div id="yt-player" style={{ width: "100%", maxWidth: "315px" }} />
        </div>
      </div>
    </>
  );
};

export default Layout;
