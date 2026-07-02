import { supabase, isSupabaseConfigured } from "./supabase";

export async function debugResourceQueries(testCourseId: string = "3") {
  if (!isSupabaseConfigured) {
    console.log("❌ Supabase is not configured - using mock data");
    return;
  }

  try {
    console.log("🔍 Starting resource query debug...\n");

    // Test 1: Check if resource table exists and has data
    console.log("Test 1: Checking if resource table has data");
    const { data: allResources, error: allError } = await supabase!
      .from("resource")
      .select("*");
    
    if (allError) {
      console.error("❌ Error fetching all resources:", allError);
    } else {
      console.log(`✅ Found ${allResources?.length ?? 0} total resources in database`);
      if (allResources && allResources.length > 0) {
        console.log("   Sample resource:", allResources[0]);
      }
    }

    // Test 2: Check resource structure
    console.log(`\nTest 2: Checking resources for course_id = ${testCourseId} (as number: ${parseInt(testCourseId)})`);
    const courseNum = parseInt(testCourseId);
    
    const { data: courseResources, error: courseError } = await supabase!
      .from("resource")
      .select("*")
      .eq("course_id", courseNum);

    if (courseError) {
      console.error("❌ Error fetching resources for course:", courseError);
      console.error("   Error details:", {
        message: courseError.message,
        code: courseError.code,
        details: courseError.details
      });
    } else {
      console.log(`✅ Found ${courseResources?.length ?? 0} resources for course ${testCourseId}`);
      if (courseResources && courseResources.length > 0) {
        console.log("   Sample resources:", courseResources.slice(0, 2));
      }
    }

    // Test 3: Check courses table for comparison
    console.log("\nTest 3: Checking courses table (as comparison)");
    const { data: courses, error: courseError2 } = await supabase!
      .from("course")
      .select("*")
      .limit(2);

    if (courseError2) {
      console.error("❌ Error fetching courses:", courseError2);
    } else {
      console.log(`✅ Found ${courses?.length ?? 0} courses`);
      if (courses && courses.length > 0) {
        console.log("   Sample course:", courses[0]);
      }
    }

    // Test 4: Count resources per course
    console.log("\nTest 4: Resource count by course_id");
    const { data: countByCourse, error: countError } = await supabase!
      .from("resource")
      .select("course_id, id");

    if (countError) {
      console.error("❌ Error counting resources:", countError);
    } else {
      const counts: Record<number, number> = {};
      countByCourse?.forEach((r: any) => {
        counts[r.course_id] = (counts[r.course_id] ?? 0) + 1;
      });
      console.log("✅ Resource counts by course:", counts);
    }

    // Test 5: Check if RLS might be the issue
    console.log("\nTest 5: RLS policy check");
    console.log("   If you see data above, SELECT policy is working");
    console.log("   If not, check Supabase > SQL Editor > Policies on resource table");

  } catch (error) {
    console.error("❌ Unexpected error during debug:", error);
  }
}

// Make available globally for console access
if (typeof window !== 'undefined') {
  (window as any).debugResourceQueries = debugResourceQueries;
  console.log("💡 Debug tool loaded. Run: debugResourceQueries('3') in browser console");
}
