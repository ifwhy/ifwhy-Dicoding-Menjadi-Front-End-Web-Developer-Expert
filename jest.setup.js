// Mock IndexedDB operations
const mockIndexedDB = {
  data: new Map(),

  async get(storeName, id) {
    return this.data.get(`${storeName}-${id}`);
  },

  async getAll(storeName) {
    const allEntries = Array.from(this.data.entries())
      .filter(([key]) => key.startsWith(storeName))
      .map(([, value]) => value);
    return allEntries;
  },

  async put(storeName, value) {
    this.data.set(`${storeName}-${value.id}`, value);
    return value;
  },

  async delete(storeName, id) {
    return this.data.delete(`${storeName}-${id}`);
  },

  clear() {
    this.data.clear();
  }
};

// Create a proper shadow DOM mock
class MockShadowRoot {
  constructor() {
    this._innerHTML = '';
    this._elements = new Map();
  }

  querySelector(selector) {
    return this._elements.get(selector) || null;
  }

  set innerHTML(content) {
    this._innerHTML = content;
    // Create a mock button when innerHTML is set
    if (content.includes('form-add-to-favorite')) {
      const button = {
        textContent: '',
        addEventListener: jest.fn((event, handler) => {
          this._elements.set('buttonHandler', handler);
        }),
        click: async function () {
          const handler = this._elements.get('buttonHandler');
          if (handler) {
            await handler();
          }
        }.bind(this)
      };
      this._elements.set('#form-add-to-favorite button', button);
    }
  }

  get innerHTML() {
    return this._innerHTML;
  }
}

// Update createElement to handle custom elements
const originalCreateElement = document.createElement;
document.createElement = jest.fn((tagName) => {
  if (tagName === 'restaurant-detail') {
    const element = {
      shadowRoot: new MockShadowRoot(),
      getAttribute: jest.fn(),
      setAttribute: jest.fn(),
      attachShadow: jest.fn(function () {
        return this.shadowRoot;
      }),
      async connectedCallback() {
        const id = this.getAttribute('data-id');
        const restaurantData = await this._fetchRestaurantDetail(id);
        await this._render(restaurantData);
        await this._handleAddToFavorite();
      },
      _fetchRestaurantDetail: jest.fn(),
      _render: jest.fn(),
      _handleAddToFavorite: jest.fn(),
      _postReview: jest.fn()
    };
    return element;
  }
  return originalCreateElement.call(document, tagName);
});

// Mock idb's openDB
jest.mock('idb', () => ({
  openDB: jest.fn().mockImplementation(() => Promise.resolve(mockIndexedDB))
}));

// Clean up function to reset IndexedDB after each test
afterEach(() => {
  mockIndexedDB.clear();
});