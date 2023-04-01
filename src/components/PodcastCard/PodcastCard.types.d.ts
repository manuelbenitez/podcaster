export interface IPodcastCard {
  feed: {
    entry: [
      {
        id: { label: string, attributes: {"im:id": string} };
        "im:artist": { label: string };
        "im:image": [{ label: string }];
        "im:name": { label: string };
        "im:price": { label: string };
      }
    ];
  };
}
