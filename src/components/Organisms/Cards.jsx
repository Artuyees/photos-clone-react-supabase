import Card from "../Molecules/Card";
import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
function Cards({ session }) {
  const [cardList2, setCardList] = useState([]);
  const [image_url, setImageUrl] = useState(null);

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      let { data, error, status } = await supabase.from("Posts").select(`
      id,
      heart_count,
      description,
      img_url,
      gps,
      created_at,
      profiles:profile_id (username, avatar_url)
      `);

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setCardList(data);
      }
    } catch (error) {
      alert(error.message);
    }
  }
  console.log(cardList2);

  return (
    <div className="flex flex-col gap-8">
      {cardList2.map((value) => (
        <Card key={value.id} value={value} url={value.img_url} />
      ))}
    </div>
  );
}

export default Cards;
