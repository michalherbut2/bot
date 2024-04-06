module.exports = async (target, { name, message, appliedTags = [target?.availableTags[0]?.id] }) => {
  console.log("creating FORUM THREAD");
  
  // applied_tags[BASE_TYPE_MAX_LENGTH]: Must be 5 or fewer in length.
  appliedTags = appliedTags.slice(0, 5) 
  
  return await target.threads.create({
    name,
    message,
    appliedTags
  });
};
