import React, { useState, useEffect } from 'react';
import { SearchIcon, UserPlus, Check, X, Github, Activity } from 'lucide-react';
import { useSelector } from 'react-redux';
import IncomponentLoading from '../components/InComponentLoading';

const Friends = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [friends, setFriends] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [loading, setLoading] = useState(false);
  const { userId } = useSelector(state => state.user);

  useEffect(() => {
    fetchFriends();
    fetchPendingRequests();
  }, []);

  const fetchFriends = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/friends', {
        credentials: 'include'
      });
      const data = await response.json();
      setFriends(data);
    } catch (error) {
      console.error('Error fetching friends:', error);
    }
  };

  const fetchPendingRequests = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/friends/requests', {
        credentials: 'include'
      });
      const data = await response.json();
      setPendingRequests(data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/friends/search?username=${searchQuery}`, {
        credentials: 'include'
      });
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching users:', error);
    }
    setLoading(false);
  };

  const sendFriendRequest = async (recipientId) => {
    try {
      await fetch('http://localhost:5000/api/friends/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ recipientId })
      });
      setSearchResults(prevResults =>
        prevResults.map(user =>
          user.id === recipientId ? { ...user, requestSent: true } : user
        )
      );
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };

  const handleRequest = async (requestId, action) => {
    try {
      await fetch(`http://localhost:5000/api/friends/request/${requestId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ action })
      });
      fetchPendingRequests();
      if (action === 'accept') {
        fetchFriends();
      }
    } catch (error) {
      console.error('Error handling request:', error);
    }
  };

  return (
    <>
      <p>Coming Sooooooon!!!!!!!!!!!!!</p>
    </>
  );
};

export default Friends;