import Array "mo:base/Array";
import Debug "mo:base/Debug";
actor {
  stable var ideas : [Text] = [];

  public func addIdea(idea: Text) : async Text {
    ideas := Array.append(ideas, [idea]);
    return "Idea added!";
  };

  public query func getIdeas() : async [Text] {
    return ideas;
  };
}
