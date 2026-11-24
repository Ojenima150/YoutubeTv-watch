import { useState , useEffect, useRef} from "react";
import { useNavigate } from "react-router-dom";
import { imageis } from "../../assets/images";


function DashApp(){
    const [videoUrl , setVideoUrl ]= useState("");
    const [videoId, setVideoId] = useState("");
    const [error, setError] = useState("");
    const[showProfile, setShowProfile] = useState(false);
    // set for three video player
    const player1Ref = useRef(null);
    const player2Ref = useRef(null);
    const player3Ref = useRef(null);

    const [views, setViews] = useState(0);
    const [watchCount, setWatchCount] = useState(0);
    const [activePlayer, setActivePlayer] = useState(1);
    const [videoLoaded, setVideoLoaded] = useState(false);

    const [user, setUser] =useState({});

    const navigate = useNavigate();

// handle user display information 
 useEffect(() => {
    fetch("/api/user", {
      credentials: "include",
    })
        .then((response) => {
        if (!response.ok) {
            throw new Error("unable to retrieve user");
        }
        return response.json();
        })
        .then((data) => {
        setUser(data.user || {});
        })
        .catch((error) => {
          console.error(error);
        });
 }, []);




    // const user = JSON.parse(localStorage.getItem("user")) || {};

    function handleLogout(){
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/login");
    }

    function getVideoId(url){
        try{
            const parsedUrl = new URL(url);
            let id="";

            if(parsedUrl.hostname.includes("youtu.be")){
                id = parsedUrl.pathname.slice(1);

            }else if(parsedUrl.pathname === "/watch"){
                id = parsedUrl.searchParams.get("v");

            }else if(
                parsedUrl.pathname.startsWith("/shorts/") ||
                parsedUrl.pathname.startsWith("/embed/")
            ){
                id = parsedUrl.pathname.split("/")[2];
            }

            return /^[a-zA-Z0-9_-]{11}$/.test(id || "")
            ? id
            : null;

        }catch{
            return null
        }
    }

   
function handleLoadVideo(e) {
    e.preventDefault();

    const id = getVideoId(videoUrl.trim());

    if (!id) {
        setError("Please enter a valid YouTube Video URL");
        return;
    }

    setError("");
    setVideoId(id);
    setViews(0);
    setWatchCount(0);
    setActivePlayer(1);
    setVideoLoaded(true);
}

useEffect(() => {

    if (!videoId || !videoLoaded) return;

    let players = [];

    function createPlayers() {

        if (!window.YT || !window.YT.Player) return;

        const playerRefs = [
            player1Ref,
            player2Ref,
            player3Ref
        ];

        players = playerRefs.map((ref, index) => {

            return new window.YT.Player(ref.current, {

                videoId: videoId,

                playerVars: {
                    autoplay: 0,
                    controls: 1,
                    rel: 0
                },

                events: {

                    onStateChange: (event) => {

                        if (
                            event.data === window.YT.PlayerState.ENDED
                        ) {

                            setViews(prev => prev + 1);
                            setWatchCount(prev => prev + 1);

                            setActivePlayer(current => {

                                const next =
                                    current === 1 ? 2 :
                                    current === 2 ? 3 : 1;

                                setTimeout(() => {

                                    players.forEach((player, i) => {
                                        if (i !== next - 1 && player.pauseVideo) {
                                            player.pauseVideo();
                                        }
                                    });

                                    players[next - 1].seekTo(0);
                                    players[next - 1].playVideo();

                                }, 300);

                                return next;
                            });
                        }
                    }
                }
            });
        });

        // Start the first player
        players[0].playVideo();
    }

    if (window.YT && window.YT.Player) {

        createPlayers();

    } else {

        window.onYouTubeIframeAPIReady = createPlayers;

        if (!document.getElementById("youtube-api")) {

            const script = document.createElement("script");

            script.id = "youtube-api";
            script.src = "https://www.youtube.com/iframe_api";

            document.body.appendChild(script);
        }
    }

    return () => {

        players.forEach(player => {

            if (player && player.destroy) {
                player.destroy();
            }

        });

    };

}, [videoId, videoLoaded]);



    return(
        <section className="dashbord-container">

            <div className="profile-dashboard">
              <div className="topfile" >
                <div className="profile-header">

                     <div className="dash-profile" >

                          <button className="profile-btn" onClick={() => setShowProfile(!showProfile)}>
                              <img src={imageis[0].image} alt="Profile" className="img-avatar" />
                              <p>{user.fname}</p>
                          </button>
                        
                        {showProfile && (

                        <div className="profile-preview">

                            <div className="preview-header">
                                 <img src={imageis[0].image} alt="Profile" className="preview-avatar" />
                                        
                                <div>
                                    <h2>{user.fname} {user.lname}</h2>
                                     <p>USER</p>
                                </div>
                            </div>
                                <hr />

                            <div className="preview-details">
                                <p><strong>Email:</strong> {user.email}</p>
                                <p>
                                    <strong>Date of Birth :</strong>{""} 
                                    {user.dob ? user.dob.split("T")[0] : "N/A"}
                                </p>
                                <p><strong>phone number:</strong> {user.phone_number}</p>
                                <p><strong>Country:</strong> {user.country}</p>
                                <p><strong>Role:</strong> user</p>
                                <p><strong>Status:</strong> Active</p>
                            </div>

                            <hr />

                            <button className="view-profile">
                                View Profile
                            </button>
                        </div>
                        )}
                     </div>
                     <button className="btn-logout" onClick={handleLogout}>Logout</button>
                </div>
              </div>
            </div>


            <div className="dashbord-co1">
 
                <header className="dashbord-header">
                    <h1>Video Dashboard</h1>
                    <span className="status">Frontend Design</span>
                </header>

                <div className="counter-container">
                    <div className="counter-card">
                        <p>Views</p>
                        <h2>{views}</h2>
                    </div>

                    <div className="counter-card">
                        <p>Watch Count</p>
                        <h2>{watchCount}</h2>
                    </div>
                </div>

                  <form className="url-form" onSubmit={handleLoadVideo}>

                    <label htmlFor="youtubeUrl">YouTube Video URL</label>

                    <input type="url" id="youtubeUrl"
                       value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                        placeholder="Paste YouTube URL here"
                        required
                    />

                    <button type="submit">  Load Video </button>

                      {error && <p className="error-message">{error}</p>}
                  </form>

                <div className="video-sections">

                   {[1, 2, 3].map((number) => (

                      <div className="video-card" key={number}>
                         
                          <div className="video-heading">
                               <h2> Video selection {number} </h2>
                               {/* <span> video {number}</span> */}
                               <span>
                                 {activePlayer === number ? "Now playing" : `Video ${number}`}
                               </span>
                          </div> 

                        <div className="video-player">
                           <div 
                             ref={
                                number === 1 ? player1Ref :
                                number === 2 ? player2Ref :
                                player3Ref 
                             }
                              id={`youtube-player-${number}`}
                             >

                           </div>
                          
                        </div>
                      </div>
                   ))}

                </div>
            </div>



            <div className="footer-dashb">
                <div className="footer-header-0">
                    <h3>jldcodo</h3>
                </div>
            
            </div>

        </section>
    )
}

export default DashApp;