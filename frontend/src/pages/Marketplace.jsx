// frontend/src/pages/Marketplace.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../services/firebase';
import Navbar from '../components/Navbar';

const Marketplace = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const propertiesRef = collection(db, 'properties');
        const q = query(propertiesRef, orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);

        const propertyList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setProperties(propertyList);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Filter properties based on search
  const displayProperties = properties.filter(property =>
    property.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (typeof property.location === 'string' ? property.location : property.location?.address)?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar />

      <main className="container" style={{ paddingTop: '100px', paddingBottom: '50px' }}>
        {/* Header */}
        <div style={{ marginBottom: '30px' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '10px' }}>
            Property Marketplace
          </h1>
          <p style={{ color: '#6b7280' }}>
            Discover tokenized real estate investment opportunities
          </p>
        </div>

        {/* Search Bar */}
        <div style={{ marginBottom: '30px' }}>
          <input
            type="text"
            placeholder="Search by property name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input"
            style={{
              maxWidth: '400px',
              padding: '12px 16px',
              fontSize: '1rem'
            }}
          />
        </div>

        {/* Loading State */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#6b7280' }}>
            Loading properties...
          </div>
        ) : (
          /* Property Grid */
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '25px'
          }}>
            {displayProperties.map((property) => {
              const soldPercent = Math.round(
                ((property.totalShares - property.availableShares) / property.totalShares) * 100
              );

              return (
                <div
                  key={property.id}
                  className="card"
                  style={{
                    padding: 0,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'transform 0.2s, box-shadow 0.2s'
                  }}
                >
                  {/* Property Image */}
                  <div style={{
                    height: '180px',
                    overflow: 'hidden',
                    position: 'relative'
                  }}>
                    <img
                      src={property.mainImageUrl || property.imageUrl || 'https://placehold.co/400x200?text=Property'}
                      alt={property.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                    <span style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      backgroundColor: property.status === 'TOKENIZED' ? '#10b981' : '#f59e0b',
                      color: 'white',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: '600'
                    }}>
                      {soldPercent}% Funded
                    </span>
                  </div>

                  {/* Property Details */}
                  <div style={{ padding: '20px' }}>
                    <h3 style={{
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      marginBottom: '5px',
                      color: '#111827'
                    }}>
                      {property.title}
                    </h3>
                    <p style={{
                      fontSize: '0.85rem',
                      color: '#6b7280',
                      marginBottom: '15px'
                    }}>
                      📍 {typeof property.location === 'string' ? property.location : (property.location?.address || 'N/A')}
                    </p>

                    {/* Progress Bar */}
                    <div style={{
                      backgroundColor: '#e5e7eb',
                      borderRadius: '10px',
                      height: '8px',
                      marginBottom: '15px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${soldPercent}%`,
                        height: '100%',
                        backgroundColor: '#10b981',
                        borderRadius: '10px'
                      }} />
                    </div>

                    {/* Stats */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '15px'
                    }}>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Price/Share</div>
                        <div style={{ fontWeight: '600', color: '#2563eb' }}>
                          {property.pricePerShare} MATIC
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Available</div>
                        <div style={{ fontWeight: '600' }}>
                          {property.availableShares}/{property.totalShares}
                        </div>
                      </div>
                    </div>

                    {/* Buy Button */}
                    <Link
                      to={`/property/${property.id}`}
                      className="btn-primary"
                      style={{
                        display: 'block',
                        textAlign: 'center',
                        padding: '12px',
                        textDecoration: 'none'
                      }}
                    >
                      View & Invest
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!loading && displayProperties.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '60px',
            backgroundColor: '#f9fafb',
            borderRadius: '12px'
          }}>
            <h3 style={{ marginBottom: '10px', color: '#374151' }}>No properties found</h3>
            <p style={{ color: '#6b7280' }}>
              {searchTerm
                ? 'Try adjusting your search criteria'
                : 'Check back later for new listings'
              }
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Marketplace;
