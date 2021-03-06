import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
sinonStubPromise(sinon);

chai.use(sinonChai);

global.fetch = require('node-fetch');

import {
  search,
  searchAlbums,
  searchArtists,
  searchTracks,
  searchPlaylists
} from '../src/main';

describe('Spotify Wrapper', () => {
  let fetchedStub;
  let promise;

  beforeEach(() => {
    fetchedStub = sinon.stub(global, 'fetch');
    promise = fetchedStub.returnsPromise();
  });

  afterEach(() => {
    fetchedStub.restore();
  });

  describe('smoke tests', () => {
    it('should exist the search method', () => {
      expect(search).to.exist;
    });

    it('should exist the searchAlbums method', () => {
      expect(searchAlbums).to.exist;
    });

    it('should exist the searchArtists method', () => {
      expect(searchArtists).to.exist;
    });

    it('should exist the searchTracks method', () => {
      expect(searchTracks).to.exist;
    });

    it('should exist the searchPlaylists method', () => {
      expect(searchPlaylists).to.exist;
    });
  });

  describe('Generic Search', () => {
    it('should call fetch function', () => {
      const artists = search();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      context('passing one type', () => {
        const artists = search('Incubus', 'artist');
        expect(fetchedStub).to.have.been.calledWith(
          'https://api.spotify.com/v1/search?q=Incubus&type=artist'
        );

        const albums = search('Incubus', 'album');
        expect(fetchedStub).to.have.been.calledWith(
          'https://api.spotify.com/v1/search?q=Incubus&type=album'
        );
      });

      context('passing more than one type', () => {
        const artistsAndAlbums = search('Incubus', ['artist', 'album']);
        expect(fetchedStub).to.have.been.calledWith(
          'https://api.spotify.com/v1/search?q=Incubus&type=artist,album'
        );
      });
    });

    it('should return the JSON Data from the Promise', () => {
      promise.resolves({ body: 'json' });
      const artists = search('Incubus', 'artist');

      expect(artists.resolveValue).to.be.eql({ body: 'json' });
    });
  });

  describe('Search Artist', () => {
    it('should call fetch function', () => {
      const artists = searchArtists();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should  called fetch with the correct URL', () => {
      const artists = searchArtists('Incubus');
      expect(fetchedStub).be.have.been.calledWith(
        'https://api.spotify.com/v1/search?q=Incubus&type=artist'
      );
    });
  });

  describe('Search Albums', () => {
    it('should call fetch function', () => {
      const albums = searchAlbums();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should  called fetch with the correct URL', () => {
      const albums = searchAlbums('Incubus');
      expect(fetchedStub).be.have.been.calledWith(
        'https://api.spotify.com/v1/search?q=Incubus&type=album'
      );

      const albums2 = searchAlbums('Muse');
      expect(fetchedStub).be.have.been.calledWith(
        'https://api.spotify.com/v1/search?q=Muse&type=album'
      );
    });
  });

  describe('Search Tracks', () => {
    it('should call fetch function', () => {
      const tracks = searchTracks();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should  called fetch with the correct URL', () => {
      const tracks = searchTracks('Incubus');
      expect(fetchedStub).be.have.been.calledWith(
        'https://api.spotify.com/v1/search?q=Incubus&type=track'
      );

      const tracks2 = searchTracks('Muse');
      expect(fetchedStub).be.have.been.calledWith(
        'https://api.spotify.com/v1/search?q=Muse&type=track'
      );
    });
  });

  describe('Search Playlist', () => {
    it('should call fetch function', () => {
      const playlists = searchPlaylists();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should  called fetch with the correct URL', () => {
      const playlists = searchPlaylists('Incubus');
      expect(fetchedStub).be.have.been.calledWith(
        'https://api.spotify.com/v1/search?q=Incubus&type=playlist'
      );

      const playlists2 = searchPlaylists('Muse');
      expect(fetchedStub).be.have.been.calledWith(
        'https://api.spotify.com/v1/search?q=Muse&type=playlist'
      );
    });
  });
});
